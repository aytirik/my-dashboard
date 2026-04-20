const prisma = require('../lib/prisma');

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: campaigns });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch campaigns' });
  }
};

const createCampaign = async (req, res) => {
  try {
    const { title, channel, budget, status, start_date } = req.body;

    if (!title || !channel || budget == null || !status || !start_date) {
      return res.status(400).json({
        success: false,
        message: 'title, channel, budget, status, and start_date are required',
      });
    }

    const campaign = await prisma.campaign.create({
      data: { title, channel, budget: Number(budget), status, startDate: new Date(start_date) },
    });
    res.status(201).json({ success: true, data: campaign });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to create campaign' });
  }
};

const updateCampaign = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.campaign.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    const { title, channel, budget, status, start_date } = req.body;
    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        ...(title != null && { title }),
        ...(channel != null && { channel }),
        ...(budget != null && { budget: Number(budget) }),
        ...(status != null && { status }),
        ...(start_date != null && { startDate: new Date(start_date) }),
      },
    });
    res.json({ success: true, data: campaign });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to update campaign' });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.campaign.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    await prisma.campaign.delete({ where: { id } });
    res.json({ success: true, message: 'Campaign deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to delete campaign' });
  }
};

module.exports = { getCampaigns, createCampaign, updateCampaign, deleteCampaign };
