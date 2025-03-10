const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    const authorizationHeaders = req.header('Authorization');
    const token = authorizationHeaders?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied'
        });
    }

    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //console.log("Decoded Token Info in authenticated:", decodedTokenInfo);
        
        req.user = decodedTokenInfo;
        
        next();
    } catch (error) {
        console.log('Error while decoding token:', error);
        return res.status(500).json({
            success: false,
            message: 'Access denied',
            error
        });
    }
};

module.exports = authenticated;
