const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const DB = require('../../config/database');
const loginSModel = require('./loginSModel.js');

exports.checkUserExist = async params => {
    try {
        let checkData = await loginSModel.findAll({ where: params });
        return { "success": true, "response": checkData };
    } catch (error) {
        return { "success": false, "response": error };
    }
}

exports.updatePassword = async (params, searchCondition) => {
    try {
        let saveResponse = await loginSModel.update(params, { where: searchCondition });
        return { "success": true, "response": saveResponse };
    } catch (error) {
        return { "success": false, "response": error };
    }
}
exports.checkPassword = async (params, where) => {
    try {
        let saveResponse = await loginSModel.findAll({ where: params });
        return { "success": true, "response": saveResponse };
    } catch (error) {
        return { "success": false, "response": error };
    }
}