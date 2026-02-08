const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/sync-user', authController.syncUser);

module.exports = router;