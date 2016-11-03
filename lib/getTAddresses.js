const db = require("./db");
const rpc = require("./rpc");

const getAddressesData = require("./getAddressesData");

module.exports = function getTAddresses(id) {
	const key = id + ":tAddresses";

	return db.llenAsync(key)
	.then(length => {
		if(length < 1) {
			return rpc.getnewaddress()
			.then(taddr => db.lpushAsync(key, taddr));
		}
	})
	.then(() => db.lrangeAsync(key, 0, -1))
	.then(getAddressesData);
};
