const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/checkUser', userController.checkUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch(
  '/updateProfile',
  authController.protect,
  userController.updateProfile
);
router.delete(
  '/deleteAccount',
  authController.protect,
  userController.deleteAccount
);

module.exports = router;
