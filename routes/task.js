const express = require('express');
const router = express.Router();
const Task = require('../database/models/Task');
const User = require('../database/models/User');
const errorHandler = require('../utils/errorHandler');

/* GET tasks listing. */
router.get('/:userid', async function (req, res) {
    try {
        const user = await User.findAll({
            include: {
                model: Task,
                attributes: { exclude: "UserId" }
            },
            where: { id: req.params.userid }
        });
        
        res.send(user[0].dataValues.Tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Something went wrong :(" });
    };
});


/* POST task create. */
router.post('/', async function (req, res) {
    try {
        const targetUser = await User.findOne({ where: { id: req.body.user } });
        if (!targetUser) return res.status(404).send({ success: false, message: "User not found!" });

        const createdTask = await Task.create({
            UserId: req.body.user,
            title: req.body.title.trim(),
            description: req.body.description,
        });
        res.send(createdTask);
    } catch (error) {
        errorHandler(res, error);
    };
});



/* POST user update. */
router.put('/:id', async function (req, res) {
    try {
        const targetUser = await User.findOne({ where: { id: req.params.id } });
        if (!targetUser) res.status(404).send({ success: false, message: "User not found." });
        await targetUser.update(req.body);
        res.send({ success: true, message: "User updated." });
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
