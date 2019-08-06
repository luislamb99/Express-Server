const { check, validationResult } = require('express-validator');
const controller = require('../controllers/rethinkController');

module.exports = (router) => {
    router.route('/registro')
        .post([
                check('nombre').isLength({ min: 4 }),
                check('email').isEmail(),
                check('edad').isNumeric(),
                check('genero').isAlpha(),
                //check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
                check('password').matches(/(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@#$%&!.+=<>|"'()·:_/]).{6,20}/, 'i'),
                check('programa').isAlpha(['es-ES'])
            ], controller.registro );
        //.get(validateToken, controller.getAll); // This route will be protected shortly

    router.route('/ingreso')
         .post([
                check('email').isEmail(),
                check('password').matches(/(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@#$%&!.+=<>|"'()·:_/]).{6,20}/, 'i'),
             ], controller.ingreso);
};