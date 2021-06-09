const express = require('express');
const router = express.Router();

const db = require('../config/database');
const Gig = require('../models/Gig');

// Get gig list
router.get('/', (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      res.render('gigs', {
        gigs,
      });
    })
    .catch((err) => console.log(err))
);

// display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // validate fields
  if (!title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  //check for errors
  if (errors.length) {
    res.render('add', {
      errors,
      title,
      technologies,
      description,
      contact_email,
    });
  } else {
    // handle blank budget
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // make lowercase and rm spaces after commas
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // insert into table
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
    })
      .then((gig) => res.redirect('/gigs'))
      .catch((err) => console.log(err));
  }
});

module.exports = router;
