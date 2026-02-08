const User = require("../models/User");
const bcrypt = require("bcryptjs");
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
        lastSync: new Date(),
        $setOnInsert: { firstOpenDate: new Date() },
      },
      { new: true, upsert: true },
    );

    res.status(200).json({
      status: "success",
      data: user,
      message: "Kullanıcı senkronize edildi.",
    });
  } catch (error) {
    console.error("User Sync Error:", error);
    res.status(500).json({ status: "error", message: "Sunucu hatası" });
  }
};

exports.register = async (req, res) => {
  try {
    const { deviceId, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "fail", message: "Bu e-posta zaten kullanımda." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { deviceId: deviceId },
      {
        email: email,
        password: hashedPassword,
      },
      { new: true },
    );

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "Kullanıcı bulunamadı." });
    }

    res.status(200).json({
      status: "success",
      data: user,
      message: "Hesap başarıyla koruma altına alındı.",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, newDeviceId } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Kullanıcı bulunamadı." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "fail", message: "Hatalı şifre." });
    }

    user.deviceId = newDeviceId;
    user.password = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      data: user,
      message: "Giriş başarılı.",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { deviceId } = req.query;

    if (!deviceId) {
      return res
        .status(400)
        .json({ status: "fail", message: "Device ID gerekli." });
    }

    const user = await User.findOne({ deviceId });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "Kullanıcı bulunamadı." });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
