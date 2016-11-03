const db = require("./db");
const rpc = require("./rpc");

module.exports = function getAddressesData(taddrs) {
	return Promise.all(taddrs.map(a => rpc.z_getbalance(a)))
	.then(balance => {
		return taddrs.map((taddr, i) => {
			return {
				address: taddr,
				balance: balance[i]
			};
		});
	});
};
