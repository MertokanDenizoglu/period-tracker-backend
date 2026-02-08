require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

// Route'ları ileride buraya import edeceğiz
// const userRoutes = require('./routes/userRoutes');

const app = express();

// Güvenlik ve Performans
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Veritabanı
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('✅ MongoDB Bağlantısı Başarılı'))
    .catch(err => console.error('❌ Bağlantı Hatası:', err));

// Test Route
app.get('/test', (req, res) => res.json({ message: 'Backend Hazır!' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));