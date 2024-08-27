const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

class UserServices {

    static async isUserExists(email) {
        try {
            return await UserModel.isUserExists(email);
        } catch (error) {
            throw error;
        }
    }

    static async signup(name, email, password) {
        try {
            return await UserModel.createUser(name, email, password);
        } catch (error) {
            throw error;
        }
    }
    static async login(email, password) {
        try {
            return await UserModel.login(email, password);
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
    }
}

module.exports = UserServices;