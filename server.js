const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');
require('./models/User');
require('./models/Task');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'Primetrade API is running.' }));

// Start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected & synced.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection failed:', err));
