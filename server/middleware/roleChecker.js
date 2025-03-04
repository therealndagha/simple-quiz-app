


const roleChecker = (req,res,next)=>{
    const decodedTokenInfo = req.user;
    if(decodedTokenInfo.role !== 'admin'){
        return res.status(401).json({
            success:false,
            message: 'Access denied , you are not an admin.'
        })
    }

    next()



}


module.exports = roleChecker