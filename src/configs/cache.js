const redis = require('redis')
const redisClient = redis.createClient();

checkCache = (req, res, next) => {
  redisClient.get(req.originalUrl, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (data != null) {
      res.send(data);
    } else {
      next();
    }
  });
};

module.exports = checkCache;