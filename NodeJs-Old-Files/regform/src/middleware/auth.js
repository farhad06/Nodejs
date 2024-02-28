const jwt = require("jsonwebtoken");
const Register = require("../modal/register");
const auth = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await Register.findOne({ _id: verifyuser._id });
        req.token = token;
        req.user = user;
        //console.log(user);
        next();
    } catch (err) {
        res.status(400).send(err);
    }
}
module.exports = auth;