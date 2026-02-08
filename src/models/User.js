const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Cihaz Kimliği (DeviceId) veya benzersiz bir ID
  // Kullanıcı silip yüklerse tanımak için mobilden unique bir ID (UUID) göndereceğiz.
  deviceId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },

  // Kişisel Kart Bilgileri
  name: { 
    type: String, 
    trim: true,
    default: 'Misafir Kullanıcı'
  },
  age: { 
    type: Number 
  },

  // Uygulama Durumu
  isPremium: { 
    type: Boolean, 
    default: false 
  },
  
  // Analitik Verisi: Ne zamandır kullanıyor?
  // createdAt zaten var ama kullanıcı uygulamayı ilk açtığı tarihi mobilden de gönderebilir.
  firstOpenDate: {
    type: Date,
    default: Date.now
  },

  // Opsiyonel: Bildirim token'ı (İleride "Regl yaklaştı" bildirimi atmak istersen)
  pushToken: {
    type: String
  }

}, { timestamps: true }); // createdAt (Kayıt tarihi) ve updatedAt otomatik gelir

module.exports = mongoose.model('User', userSchema);