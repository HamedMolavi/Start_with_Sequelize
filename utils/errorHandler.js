const { ValidationErrorItem } = require('sequelize');


function errorHandler(res, error) {
    console.log(error);
    if (error.errors instanceof Array && error.errors[0] instanceof ValidationErrorItem) {
        return res.status(400).send({ success: false, message: error.errors.map(el => el.message) });
    };
    res.status(500).send({ success: false, message: "Something went wrong :(" });
};

module.exports = errorHandler;