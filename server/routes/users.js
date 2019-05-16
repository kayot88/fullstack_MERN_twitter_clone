const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

router.route('/register').post((req, res) => {
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

router.route('/login').post((req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const token = jwt.sign(
              { id: user._id },
              process.env.SECRET,
              { expiresIn: '1d' },
              function(err, token) {
                return res.json({
                  success: true,
                  token: token
                });
              }
            );
          } else {
            errors.password = 'password is incorrect';
            return res.status(404).json(errors);
          }
        });
      } else {
        errors.email = 'No match user found';
        return res.status(404).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.route('/').get(passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('Here');
  // console.log(req.user);
  res.json({
    _id: req.user._id,
    email: req.user.email,
    login: req.user.login,
    followers: req.user.followers,
    following: req.user.following
  })
})

module.exports = router;
