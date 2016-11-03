const db = require("./db");
const rpc = require("./rpc");

module.exports = function newTAddress(id) {
	const key = id + ":tAddresses";

	return rpc.getnewaddress()
	.then(taddr => db.lpushAsync(key, taddr));
};
