const db = require("./db");
const rpc = require("./rpc");

const getAddressesData = require("./getAddressesData");

module.exports = function getZAddresses(id) {
	const key = id + ":zAddresses";

	return db.llenAsync(key)
	.then(length => {
		if(length < 1) {
			return rpc.z_getnewaddress()
			.then(taddr => db.lpushAsync(key, taddr));
		}
	})
	.then(() => db.lrangeAsync(key, 0, -1))
	.then(getAddressesData);
};
