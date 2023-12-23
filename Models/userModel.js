const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An user must have a name"],
      trim: true,
      maxlength: [40, "A name must be less or equal to 40 character"],
    },

    email: {
      type: String,
      required: [true, "An User must have an email"],
      unique: true,
      lowercase: true,
    },
    // photo: {
    //   type: String,
    // },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 8,
      // select: false, //Hiding it from the user only showing in DB
    },
  },
  { timestamps: true } //created at and updated at dinxa
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
