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
      required: [true, "An User must have email"],
    },
  },
  { timestamps: true } //created at and updated at dinxa
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
