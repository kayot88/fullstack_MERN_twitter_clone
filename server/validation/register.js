const Validator = require('validator');

module.exports = function(data) {
  let errors = {};
  //email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cant be empty';
    console.log(errors);
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Its not Email';
  }
  //login
  if (Validator.isEmpty(data.login)) {
    errors.login = 'Login cant be empty';
  }
  if (!Validator.isLength(data.login, { min: 2, max: 30 })) {
    errors.login = `Login mast be from 2 to 30 characters length`;
  }
  //pass
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cant be empty';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = `password mast be from 6 to 30 characters length`;
  }
  //pass2
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Password cant be empty';
  }
  //equals
  if (!Validator.equals(data.password2, data.password)) {
    errors.password2 = `passwords mast be match`;
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
