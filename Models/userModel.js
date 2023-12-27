const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
      validate: [validator.isEmail, "Invalid Email"],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 8,
      select: false, //Hiding it from the user only showing in DB
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please Confirm your password"],
      validate: {
        //This only works on//! CREATE And SAVE
        validator: function (el) {
          return el === this.password; //el vanya passwordConfirm and then this.password vanya password
        },
        message: "Password and Confirm Password are not same",
      },
    },
    passwordChangedAt: Date,
  },
  { timestamps: true } //created at and updated at dinxa
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12); //bcrypt.hash function is an asynchronous operation that returns a Promise

  this.passwordConfirm = undefined;
  next();
});
//instance method
UserSchema.methods.correctPassword = async function (
  logingardahalekopassword,
  dbmaencryptvayerabaseakopassword
) {
  return await bcrypt.compare(
    logingardahalekopassword,
    dbmaencryptvayerabaseakopassword
  );
};

//insatnce method ho this points to the current doc
UserSchema.methods.changedPasswordAfterReceivingtoken = function (
  JWTTimestamp //JWTTimestamp:token kaile receive vako
) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    // console.log(JWTTimestamp, changedTime);
    return changedTime > JWTTimestamp;
  }

  //!password cahnge vako xaina
  return false;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
