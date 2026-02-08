const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
let token;

if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    token = req.headers.authorization.split(' ')[1];
}

if (!token) {
    return res.status(401).json({ success: false, error: 'No Token' });
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next(); 
} catch (error) {
    return res.status(401).json({ success: false, error: ' invalid token ' });
}
};

exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false, error: 'admin only can do this'
            })
        }
        next()
    }
}