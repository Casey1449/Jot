const levelup = require('level');
const shortid = require('shortid');

function Note (body, notebook, modified=Date.now(), title) {
  this.id = shortid.generate(),
  this.body = body,
  this.notebook = notebook,
  this.title = title || null,
  this.lastModified = modified,
  this.timeStamp = Date.now()
}
module.exports = [
  Note,
  levelup('./mydb', {'valueEncoding': 'json'})
];
