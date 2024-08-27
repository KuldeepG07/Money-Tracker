const mongoose = require('mongoose');
const db = require('../configurations/database');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
    },
    profileImage: {
        type: String,
        default: 'default.png',
    },
    joinedDate: {
        type: Date,
        default: Date.now()
    },
});

userSchema.pre('save', async function() {
    try {
        var user = this;
        const salt = await (bcrypt.genSalt(10));
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;

    } catch(error) {
        throw error;
    }
});

userSchema.statics.isUserExists = async function(email) {
    try {
        const user = await this.findOne({ email });
        if(user) {
            return user;
        }
        else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

userSchema.statics.createUser = async function(name, email, password) {
    try {
        const user = new this({ name, email, password });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

const userModel = db.model('User', userSchema);
module.exports = userModel;