const redis = require("redis");
const bluebird = global.Promise = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = redis.createClient();
