const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialNetworkDB';
// replace with new created mongodb database for social network

connect(connectionString);

module.exports = connection;

