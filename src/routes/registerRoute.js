const {Router} = require('express');
const router = Router();
const {getRegisterIndex , passportRegister, getRegisterError} = require('../controllers/controllerRegister')

router.get('/', getRegisterIndex )
router.post('/', passportRegister);
router.get('/register-error', getRegisterError)

module.exports = router;