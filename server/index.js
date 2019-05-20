const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const users = require('./routes/users');
const post = require('./routes/posts');

//setup inv
require('dotenv').config({ path: '.env' });

//mongodb connect
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use('/api/users', users);
app.use('/api/posts', post);
app.use(passport.initialize());
require('./config/passport')(passport);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
