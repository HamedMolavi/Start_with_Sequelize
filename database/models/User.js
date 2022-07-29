const connection = require('../connection');
const { Sequelize } = require('sequelize');
const validator = require('validator');
const Task = require('./Task');


const User = connection.define('User', {
    // attributes
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { args: [true], msg: "Firstname is required!" },
            notNull: { msg: "Firstname is required!" },
            len: { args: [3, 20], msg: "Firstname most be less than 20 and more than 3." }
        }
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { args: [true], msg: "Lastname is required!" },
            notNull: { msg: "Lastname is required!" },
            len: { args: [3, 40], msg: "Lastname most be less than 40 and more than 3." }
        }
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: { args: [true], msg: "Username is required!" },
            notNull: { msg: "Username is required!" },
            len: { args: [3, 20], msg: "Username most be less than 20 and more than 3." }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { args: [true], msg: "Password is required!" },
            notNull: { msg: "Password is required!" },
            is: { args: [/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/], msg: "Password should be atleast eight character, one lowercase, one special character and one number!" },


        }
    },
    email: {
        type: Sequelize.STRING,
        // allowNull defaults to true
        validate: {
            isEmail: { args: [true], msg: 'Invalid email pattern!' },
        },
    },
    tel: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { args: [true], msg: "Phone number is required!" },
            notNull: { msg: "Password is required!" },
            isTe(value) {
                if (!validator.isMobilePhone(value, 'fa-IR')) throw new Error("Invalid phone number!");
            },
        },
    }
}, {
    // options
    timestamps: true,
    tableName: 'users'
});


User.hasMany(Task, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Task.belongsTo(User);







module.exports = User;