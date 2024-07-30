const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('travels/index.ejs', {
        travels: currentUser.travels,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error)
      res.redirect('/')
    }
  });
  router.get('/new', async (req, res) => {
    res.render('travels/new.ejs');
  });

  router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
  
      req.body.date= new Date(req.body.date)
  
      currentUser.travels.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/travels`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });
  
  router.get('/:travelId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const travel = currentUser.travels.id(req.params.travelId);
      res.render('travels/show.ejs', {
        travel: travel,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  router.delete('/:travelId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.travels.id(req.params.travelId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/travels`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  router.get('/:travelId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const travel = currentUser.travels.id(req.params.travelId);
      res.render('travels/edit.ejs', {
        travel: travel,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  

  router.put('/:travelId', async (req, res) => {
    try {
      // Find the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      const travel = currentUser.travels.id(req.params.travelId);
      travel.set(req.body);
      await currentUser.save(); // Save the changes to the database
      res.redirect(`/users/${currentUser._id}/travels/${req.params.travelId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


module.exports = router;