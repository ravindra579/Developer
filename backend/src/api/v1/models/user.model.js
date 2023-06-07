const mongoose = require('mongoose');
const validator = require('validator');
const { paginate, toJSON } = require('./plugins');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: function () {
        if (this.name && this.name.length && this.name.split(' ')[0]) {
          return this.name.split(' ')[0];
        }
      },
    },
    lastName: {
      type: String,
      trim: true,
      default: function () {
        if (this.name && this.name.length && this.name.split(' ')[1]) {
          return this.name.split(' ')[1];
        }
      },
    },
    dob: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    country:{
      type:String,
    },
    state:{
      type:String,
    },
    city:{
      type:String,
    },
    gender:{
      type:String,
    },
    age:{
      type:Number,
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to JSON
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
