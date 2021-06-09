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
  const data = {
    title: 'iOS app',
    technologies: 'swift,java,mobile',
    budget: '2300',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    contact_email: 'steve2@email.com',
  };

  let { title, technologies, budget, description, contact_email } = data;

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
});

module.exports = router;
