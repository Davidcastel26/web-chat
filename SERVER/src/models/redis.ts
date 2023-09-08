// const Redis = require('ioredis')
import Redis from 'ioredis'
// const redis = require('redis')
// const connectRedis = require('connect-redis');
const redisClient = new Redis()

export default redisClient;