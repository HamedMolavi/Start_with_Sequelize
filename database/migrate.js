const User = require('./models/User');

(async function () {
    try {
        await User.sync({ force: true });
    } catch (error) {
        console.error('Unable to sync tables:', error);
        process.exit(1);
    }
})();