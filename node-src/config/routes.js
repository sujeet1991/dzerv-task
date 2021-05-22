var loginController = require('../app/controllers/login');

module.exports = function (app) {
    app.post('/userprofile/checkUserExist', loginController.checkUserExist);
    app.post('/userprofile/updatePassword', loginController.updatePassword);
}