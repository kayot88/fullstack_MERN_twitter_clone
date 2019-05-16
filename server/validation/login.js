const Validator = require('validator');

module.exports = function(data) {
  let errors = {};
  //email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cant be empty';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Its not Email';
  }
   //pass
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cant be empty';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = `password mast be from 6 to 30 characters length`;
  }
    return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
