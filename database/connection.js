require('dotenv').config();
const { Sequelize } = require('sequelize');

const connection = new Sequelize(process.env['DATABASE'], 'root', process.env['DATABASE_PASSWORD'], {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

(async function () {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.\n\n');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    };
})();


module.exports = connection;