const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')
const crypto = require(`crypto`)
exports.register = async (req, res, next) => {
try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    const verificationToken = user.getVerificationToken();
    await user.save({ validateBeforeSave: false }); 

    const verifyUrl = `${req.protocol}://${req.get('host')}/api/auth/verifyemail/${verificationToken}`;

    const message = `please click on the link to activate the account \n\n ${verifyUrl}`;

    try {
        await sendEmail({
        email: user.email,
        subject:  `account activation`,
        message
        });

        res.status(200).json({
        success: true,
        data: 'email has been sent please check inbox'
        });
    } catch (err) {
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return res.status(500).json({ success: false, error: 'email failed to be sent' });
    }

    } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    }
};

exports.login = async function (req,res,next){
    try {
        const {password,email}=req.body
        if(!password || !email){
            return res.status(400).json({success:false,error:"please enter data fields"})
        }

        const user = await User.findOne({email}).select('+password')
        if(!user){
            return res.status(400).json({success:false,error:"user not found"})
        }

        if (!user.isVerified) {
            return res.status(401).json({ 
                success: false, 
                error: "Please verify your email first!" 
            });
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


exports.verifyEmail = async (req, res, next) => {
    try {
    const verificationToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        verificationToken,
        verificationTokenExpire: { $gt: Date.now() } 
    });

    if (!user) {
        return res.status(400).json({ success: false, error: 'the url is not valid' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        data: 'The account has been activated successfully',
        token
    });

    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

