require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const campaignsRouter = require('./routes/campaigns');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Dashboard API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
