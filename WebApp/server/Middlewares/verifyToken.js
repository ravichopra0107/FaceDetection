const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.cookies) {
    if (req.cookies.token) {
      const data = jwt.verify(req.cookies.token, process.env.JWTSECRET);
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
