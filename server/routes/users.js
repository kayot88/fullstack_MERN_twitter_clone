const router = require('express').Router();
const User = require('../models/User');
const validateRegisterInput = require('../validation/register');
const bcrypt = require('bcryptjs');

router
  .route('/register')
  .post((req, res) => {
    const { isValid, errors } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(404).json(errors);
      }
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          const newUser = new User({
            email: req.body.email,
            login: req.body.login,
            password: hash
          });
          newUser
            .save()
            .then(newUser => {
              return res.json(newUser);
            })
            .catch(err => {
              return console.log(err);
            });
        });
      });
    });
  });

module.exports = router;
