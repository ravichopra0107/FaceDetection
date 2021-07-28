const checkAdmin = (req, res, next) => {
  console.log(req.body.admin, process.env.ADMIN);
  if (req.body.admin == process.env.ADMIN) {
    next();
  } else {
    console.log("Error");
    res.sendStatus(403);
  }
};

module.exports = checkAdmin;
