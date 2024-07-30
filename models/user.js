const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  }, {
    timestamps: true
  });


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  travels: [travelSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
