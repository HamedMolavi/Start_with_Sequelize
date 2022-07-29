const User = require('./models/User');
const Task = require('./models/Task');

(async function () {
    try {
        await User.sync({ aletr: true });
        await Task.sync({ aletr: true });
    } catch (error) {
        console.error('Unable to sync tables:', error);
        process.exit(1);
    }
})();