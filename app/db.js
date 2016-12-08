const levelup = require('level');
const shortid = require('shortid');

function Note (body, modified=Date.now(), title) {
  this.id = shortid.generate(),
  this.body = body,
  this.title = title || null,
  this.lastModified = modified,
  this.timeStamp = Date.now()
}
module.exports = [
  Note,
  levelup('./mydb', {'valueEncoding': 'json'})
];
