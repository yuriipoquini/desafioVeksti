const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const signToken = id => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN
//   });
// };

// const createSentToken = (user, statusCode, res) => {
//   const token = signToken(user.id);
//   const cookieOptions = {
//     expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
//     httpOnly: true
//   };

//   res.cookie('jwt', token, cookieOptions);
//   res.status(statusCode).json({ status: 'success', token, data: { user } });
// };

exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword
    });

    res.json({ user });
    //createSentToken(user, 201, res)
  } catch (e) {
    res.status(400).json({ error: "Registration Failed!" });
  }
};

exports.login = async (req, res) => {
  const { password, email } = req.body;

  console.dir(User);
  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(400).json({ error: "User not found!" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ error: "invalid password" });
  }
  res.json({ user });
  //createSentToken(user, 200, res);
};

