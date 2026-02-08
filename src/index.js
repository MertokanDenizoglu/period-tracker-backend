require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json()); 
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('✅ MongoDB Bağlantısı Başarılı'))
    .catch(err => console.error('❌ Bağlantı Hatası:', err));
app.use('/api/auth', authRoutes);

// Test Route
app.get('/test', (req, res) => res.json({ message: 'Backend Hazır!' }));

// Sunucu Başlatma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));