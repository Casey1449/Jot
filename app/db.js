const levelup = require('level');

module.exports = levelup('./mydb', {'valueEncoding': 'json'});
