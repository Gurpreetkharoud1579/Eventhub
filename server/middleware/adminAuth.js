const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function adminAuth(req, res, next) {
  try {
    // Read token from the request cookies
    const token = req.cookies.Authorization;

    // Decode the token
    var decoded = jwt.verify(token, process.env.SECRET);

    // Check expiration
    if (decoded.exp < Date.now()) {
      return res.sendStatus(401);
    }

    // Get the user's ID from the token's sub (user._id)
    const userId = decoded.sub;

    // Find the user using the token's sub (user._id)
    const user = await User.findById(userId);

    if (!user) {
      return res.sendStatus(401);
    }

    // Check if user is an admin (you can modify this condition based on your user model)
    if (user.userType !== 'admin') {
      return res.sendStatus(403); // Forbidden
    }

    // Attach the user to the request
    req.user = user;

    // Continue
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

module.exports = adminAuth;
