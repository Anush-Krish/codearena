const userService = require('../services/user.service');

const register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({message: 'User registered successfully', user});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

module.exports = {register};
