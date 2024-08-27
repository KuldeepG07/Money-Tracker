const UserServices = require('../services/user.services');
const userServices = require('../services/user.services');

exports.getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ status: false, message: 'Email is required.' });
        }
        const userExists = await userServices.isUserExists(email);
        if ( !userExists) {
            return res.status(400).json({ status: false, message: 'No user found with the given email.' });
        }
        return res.status(200).json({ status: true, message: 'User exists with the given email.', userExists });
    } catch (e) {
        throw e;
    }
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await userServices.isUserExists(email);
        if (userExists) {
            return res.status(400).json({ status: false, message: 'User exists with the given email.' });
        }
        const signupResult = await userServices.signup(name, email, password);
        return res.status(200).json({ status: true, message: 'Account created successfully.' });
    } catch (e) {
        throw e;
    }
};

exports.login = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        const user = await userServices.login(email, password);
        if( !user ) {
            return res.status(400).json({status: false, message: 'Invalid credentials.'});
        }

        return res.status(200).json({status: true, message: 'Logged In Successfully.', user: user});
    } catch (e) {
        throw e;
    }
};