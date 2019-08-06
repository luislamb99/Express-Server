const usuarios = require('./usuarios');

module.exports = (router) => {
    usuarios(router);
    return router;
};