const express = require('express');
const router = express.Router();

const { loginUser, registerUser } = require('../controllers/authController');
const validate = require('../middleware/validate');
const registerSchema = require('../validators/userValidator');


// ✅ Routes
router.post('/login', loginUser);
router.post('/register', validate(registerSchema), registerUser);


module.exports = router;
