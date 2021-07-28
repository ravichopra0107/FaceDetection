const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.cookies) {
    if (req.cookies.token) {
      const data = jwt.verify(req.cookies.token, process.env.JWTSECRET);
      next();
    } else {
      res.json({ status: false }).status(400);
    }
  } else {
    res.json({ status: false }).status(400);
  }
};

module.exports = verifyToken;