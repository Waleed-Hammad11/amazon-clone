const User = require('../models/userModel')

exports.register = async function(req,res){
    try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
    name,
    email,
    password,
    role
    });

    const token = user.getSignedJwtToken();


    res.status(201).json({
    success: true,
    token, 
    user: { id: user._id, name: user.name, email: user.email } 
    });

} catch (error) {
    res.status(400).json({
    success: false,
    error: error.message
    });
}
}
