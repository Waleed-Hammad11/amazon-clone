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

exports.login = async function (req,res){
    try {
        const {password,email}=req.body
        if(!password || !email){
            return res.status(400).json({success:false,error:"please enter data fields"})
        }

        const user = await User.findOne({email}).select('+password')
        if(!user){
            return res.status(400).json({success:false,error:"user not found"})
        }

        const isMatch = await user.matchPassword(password)

        if (!isMatch){
            return res.status(400).json({success:false,error:"Enter correct Password"})
        }

        const token = user.getSignedJwtToken()

        res.status(200).json({
            success:true,
            token
        })

    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}