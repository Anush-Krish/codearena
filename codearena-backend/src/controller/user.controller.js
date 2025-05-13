const userService = require('../services/user.service');

const register = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json({message: 'User registered successfully:', result});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({message: 'User logged in!', result});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

module.exports = {register, login};
