const levelup = require('level');

function Note (body, modified, title) {
  this.id = 123,
  this.body = body,
  this.title = title || null,
  this.lastModified = modified,
  this.timeStamp = Date.now()
}
module.exports = [
  Note,
  levelup('./mydb', {'valueEncoding': 'json'})
];
