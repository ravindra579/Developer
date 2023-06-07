const { Router } = require('express');
const userRoute = require('../controllers/User/user.route');
const router = Router();
router.use('/users', userRoute);

module.exports = router;
