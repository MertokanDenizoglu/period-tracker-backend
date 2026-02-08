const User = require('../models/User');

exports.syncUser = async (req, res) => {
  try {
    const { deviceId, name, age, isPremium, pushToken } = req.body;

    const user = await User.findOneAndUpdate(
      { deviceId: deviceId },
      { 
        name, 
        age, 
        isPremium,
        pushToken,
        $setOnInsert: { firstOpenDate: new Date() } 
      },
      { new: true, upsert: true } 
    );

    res.status(200).json({ 
      status: 'success', 
      data: user,
      message: 'Kullanıcı senkronize edildi.' 
    });

  } catch (error) {
    console.error('User Sync Error:', error);
    res.status(500).json({ status: 'error', message: 'Sunucu hatası' });
  }
};