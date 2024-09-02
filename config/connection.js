const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/studentsDB';
// replace with new created mongodb database for social network

connect(connectionString);

module.exports = connection;
