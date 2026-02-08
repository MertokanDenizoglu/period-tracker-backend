require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

// 1️⃣ BURAYI EKLE: Route dosyasını içeri alıyoruz
const authRoutes = require('../src/routes/authRoute'); 
// Eğer dosyaların hepsi src klasöründeyse: require('./routes/authRoutes')

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Veritabanı
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('✅ MongoDB Bağlantısı Başarılı'))
    .catch(err => console.error('❌ Bağlantı Hatası:', err));

// 2️⃣ BURAYI EKLE: Route'u aktif ediyoruz
// Bu satır sayesinde "/api/auth" ile başlayan her istek authRoutes dosyasına gider.
app.use('/api/auth', authRoutes);

app.get('/test', (req, res) => res.json({ message: 'Backend Hazır!' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));