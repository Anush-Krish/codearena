const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async ({firstName, lastName, email, password}) => {
    const existing = await User.findOne({email});
    if (existing) {
        console.log('Email already in use:', existing);
        throw new Error('Email already in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({firstName, lastName, email, password: hashPassword});
    const savedUser = await user.save();
    const token = jwt.sign({id: savedUser._id, email}, process.env.SECRET_KEY);
    savedUser.token = token;
    savedUser.password = undefined;

    return {savedUser};
};

module.exports = {register};
