const User = require("./../Models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      // password: req.body.password,
      // passwordConfirm: req.body.passwordConfirm,
      // passwordChangedAt: req.body.passwordChangedAt,
      // role: req.body.role,
    });

    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
