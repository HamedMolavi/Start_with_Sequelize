const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const errorHandler = require('../utils/errorHandler');

/* GET users listing. */
router.get('/', async function (_req, res) {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password", "createdAt", "updatedAt"] } });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong :(" });
  };
});


/* POST user create. */
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
    delete createdUser.dataValues.password;
    delete createdUser.dataValues.createdAt;
    delete createdUser.dataValues.updatedAt;
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



/* POST user update. */
router.put('/:id', async function (req, res) {
  try {
    const targetUser = await User.findOne({ where: { id: req.params.id } });
    if (!targetUser) res.status(404).send({ success: false, message: "User not found." });
    await targetUser.update(req.body);
    res.status(201).send({ success: true, message: "User updated." });
  } catch (error) {
    errorHandler(res, error);
  };
});



/* POST user delete. */
router.delete('/:id', async function (req, res) {
  try {
    const targetUser = await User.findOne({ where: { id: req.params.id } });
    if (!targetUser) res.status(404).send({ success: false, message: "User not found." });
    await targetUser.destroy();
    res.send({ success: true, message: "User deleted." });
  } catch (error) {
    errorHandler(res, error);
  };
});




module.exports = router;
