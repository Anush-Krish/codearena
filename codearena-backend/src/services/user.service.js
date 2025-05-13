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

    const token = generateToken(savedUser);

    return {
        token,
        user: {
            id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email
        }
    };
};

const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, email: user.email},
        process.env.SECRET_KEY,
        {expiresIn: '1d'}
    );
};

const login = async ({email, password}) => {
    const existingUser = await User.findOne({email});
    if (!existingUser) {
        console.log("User does not exist:", email);
        throw new Error('Invalid Email or password!');
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(existingUser);

    return {
        token,
        user: {
            id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email
        }
    };
};


module.exports = {register, login};
