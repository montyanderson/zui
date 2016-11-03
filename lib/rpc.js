const argv = require("./argv");
const Zcash = require("../../zcash");

module.exports = new Zcash({
	username: argv.rpcUsername || "username",
	password: argv.rpcPassword || "x"
});
