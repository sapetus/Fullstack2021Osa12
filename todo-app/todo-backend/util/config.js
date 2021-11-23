const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_PORT = process.env.REDIS_PORT || undefined

module.exports = {
  MONGO_URL,//: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_PORT//: NEED TO USE THIS AS PORT (6379)
}