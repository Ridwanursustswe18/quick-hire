const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ success: true, message: 'User registered successfully', data: result });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ success: true, message: 'Login successful', data: result });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res) => {
  res.json({ success: true, data: req.user });
};

module.exports = { register, login, getCurrentUser };