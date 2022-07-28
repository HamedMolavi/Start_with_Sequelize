const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const errorHandler = require('../utils/errorHandler');

/* GET users listing. */
router.get('/', async function (_req, res) {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong :(" });
  };
});


/* POST users listing. */
router.post('/', async function (req, res) {
  try {
    const createdUser = await User.create({
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      username: req.body.username.trim(),
      password: req.body.password.trim(),
      tel: req.body.tel.trim(),
      email: req.body.email.trim()
    });
    // console.log(createdUser);// data of new user is under the createdUser.dataValues => also look at _previousDataValues, changed
    delete createdUser.dataValues.password
    delete createdUser.dataValues.createdAt
    delete createdUser.dataValues.updatedAt
    res.send(createdUser);
  } catch (error) {
    // console.log(error);
    // if (error.errors instanceof Array && error.errors[0] instanceof ValidationErrorItem) {
    //   return res.status(400).send({ errors: error.errors.map(el => el.message) });
    // };
    // res.status(500).send({ success: false, message: "Something went wrong :(" });
    errorHandler(res, error);
  };
});




module.exports = router;
