const connection = require('../connection');
const { Sequelize } = require('sequelize');
const validator = require('validator');

const Task = connection.define('Task', {
    // attributes
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { args: [true], msg: "Firstname is required!" },
            notNull: { msg: "Firstname is required!" },
            len: { args: [3, 20], msg: "Title most be less than 20 and more than 3." }
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            len: { args: [0, 600], msg: "Description most be less than 600 and more than 0." }
        }
    },
    done: {
        type: Sequelize.STRING,
        defaultValue: false
    },
}, {
    // options
    timestamps: true,
    tableName: 'tasks'
});

module.exports = Task;