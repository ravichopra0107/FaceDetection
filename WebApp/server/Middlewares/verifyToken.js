const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(req.headers["x-access-token"]);
  if (req.headers["x-access-token"]) {
    try {
      const data = jwt.verify(
        req.headers["x-access-token"],
        process.env.JWTSECRET
      );
      req.body.user = data.user._doc;
    } catch {
      res.sendStatus(403);
    }
    next();
  } else if (req.cookies) {
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
