const prisma = require('../lib/prisma');

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.status(201).json(user);
};

const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: { name, email },
  });
  res.json(user);
};

const deleteUser = async (req, res) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
