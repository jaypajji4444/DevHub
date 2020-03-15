const jwt = require("jsonwebtoken");
const config = require("config")

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
            if (err) {
                res.status(401).json({ msg: "Token is not valid!!!" })
            }
            else {
                req.user = decoded;
                next();
            }
        })
    }
    catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}