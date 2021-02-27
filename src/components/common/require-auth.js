const requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    return res.status(401).send('Not authorized');
  }
  next();
};

module.exports = requireAuth;
