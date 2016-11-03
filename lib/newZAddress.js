const db = require("./db");
const rpc = require("./rpc");

module.exports = function newTAddress(id) {
	const key = id + ":zAddresses";

	return rpc.z_getnewaddress()
	.then(taddr => db.lpushAsync(key, taddr));
};
