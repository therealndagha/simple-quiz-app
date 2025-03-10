const roleChecker = (req, res, next) => {
    console.log("User inside roleChecker:", req.user); // Debugging

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'No user found in request. Ensure authenticated middleware is running before roleChecker.'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: `Access denied, you are not an admin. Your role: ${req.user.role}`
        });
    }

    next();
};


module.exports = roleChecker;