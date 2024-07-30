const express = require('express');
const router = express.Router();

const User = require('../models/user');

index = async (req, res) => {
    const users = await User.find({});
    res.render('users/index.ejs', { users });
};

show = async (req, res) => {
      const user = await User.findById(req.params.id).populate('travels');
      res.render('users/show.ejs', { user });
    
  };

  module.exports = {index, show};
