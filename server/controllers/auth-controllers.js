

const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req,res)=>{

    try {

        const {fullname,email, password, role} = req.body;

        if(!fullname, !email, !password, !role){

            return res.status(400).json({
                success:false,
                message: 'all fields are mandatory'
            })

        }

        const findUserIfAlreadyExists = await User.findOne({email});

        if(findUserIfAlreadyExists){

            return res.status(400).json({
                success:false,
                message:'email account already in use, please try another one'
            })

        }
        
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

        const userRegistered = await User.create({

            fullname, email, password: hashedPassword, role : role || 'student'
        });
     
        if(userRegistered){
            return res.status(201).json({
                success:true,
                message:'user registered successfully'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong while attempting to register the user.'
        })
    }
}

const loginUser = async (req,res)=>{

    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: 'all fields are mandatory'
            })
        }

        const findUser = await User.findOne({email});

        if(!findUser){
            return res.status(401).json({
                success:false,
                message:'invalid credentials'
            })
        }

        const isCorrectPassword = await bcrypt.compare(password, findUser.password);

        if(!isCorrectPassword){
            return res.status(401).json({
                success:false,
                message:'invalid credentials'
            })
        }
         
        const accessToken = jwt.sign({id: findUser._id, role: findUser.role, email: findUser.email }, process.env.JWT_SECRET_KEY, {expiresIn: '1500m'});
         
        return res.status(200).json({
            success:true,
            message:'user authenticated',
            accessToken
        })
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:'something went wrong while attempting to login the user.'
        })
    }
}

module.exports = {registerUser, loginUser}