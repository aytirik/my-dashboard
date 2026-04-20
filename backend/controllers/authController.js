const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role: role ?? 'user' },
    });

    res.status(201).json({ id: user.id, name: user.name, role: user.role });
  } catch {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'No account found with this email' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({ name: user.name, role: user.role });
  } catch {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
