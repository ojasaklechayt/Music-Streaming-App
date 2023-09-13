const Token = require('./models/tokenModel');
const jwt = require("jsonwebtoken");

const generatejwt = async (user, res) => {
    const { _id, email } = user;
    const token = jwt.sign(
        { user_id: _id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );

    const tokenRecord = new Token({ token });
    await tokenRecord.save();
    console.log(token);
    res.cookie("token", token);
}

const verifyjwt = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const tokenRecord = await Token.findOne({ token });

        if (!tokenRecord) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = {generatejwt, verifyjwt};