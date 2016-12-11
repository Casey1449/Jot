var Application = require('spectron').Application
var expect = require('chai').expect;
var assert = require('chai').assert;
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

var appPath = path.join(__dirname, '..');

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('App starts and has correct initial appearance', function () {

  let app = null;

  before(function () {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  after(function () {
    return app.stop();
  });

  it('opens a window', function () {
      return app.client.waitUntilWindowLoaded()
        .getWindowCount().should.eventually.equal(2);
  });

  it('tests the title', function () {
  return app.client.waitUntilWindowLoaded()
    .getTitle().should.eventually.equal('Jot');
  });

  it('displays an "add notebook" button', function (){
    return app.client.getText('.add-notebook-button').then(function (buttonText) {
      assert(buttonText === 'Add Notebook');
    });
  });

  it('displays a "save note" button', function (){
    return app.client.getText('.save-note-button').then(function (buttonText) {
      assert(buttonText === 'Save note');
    });
  });

  it('displays a "delete note" button', function (){
    return app.client.getText('.delete-note-button').then(function (buttonText) {
      assert(buttonText === 'Delete note');
    });
  });

  xit('displays a text field', function (){
    return app.client.click('.note-input-text').then(function (buttonText) {
      assert(buttonText === 'Delete note');
    });
  });

  //has a text field
  //shows the notes log
});

describe('App allows user to create and save notes', function () {

  let app = null;

  before(function () {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  after(function () {
    return app.stop();
  });

  it('should allow user to add a note', function () {
    return app.client.click('.save-note-button')
      .then(function() {
        assert.equal('.note-log--note', 1);
    });
  });
});

describe('App allows user to read previous notes', function () {

  let app = null;

  before(function () {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  after(function () {
    return app.stop();
  });

  it('render added notes from db', function () {
  });
});


describe('Note update', function () {

  let app = null;

  before(function() {
    app = new Application({ path: electronPath, args: [appPath]});
    return app.start();
  });

  after(function() {

      return app.stop();
  });

  it('should have a field to edit content', () => {
    return app.client.waitUntilWindowLoaded()
      .then(function(newText){
        expect('.note-input-text').to.exist;
    });
  });

  it('should have button to save edited contents', function() {
    return app.client.waitUntilWindowLoaded().getText('.save-note-button')
      .then(function(buttonText) {
        assert(buttonText === 'Save note');
    });
  });

  xit('should update date last modified on click of save', function() {
    let testNote = new Note('content');
    const id = note.id;
    // db.put(id, testNote);
  });

  xit('should reorder list items with most recently edited at the top', function() {

  });

  xit('should save changes to DB', function(){

  });

  xit('should save edited changes to render method', function(){

  });
});

describe('Note delete', function () {

  var app = null;

  before(function() {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  after(function() {
      return app.stop();
  });

  it('should render a delete button', () => {
    return app.client.waitUntilWindowLoaded().getText('.delete-note-button')
      .then(function(buttonText) {
        assert(buttonText === 'Delete note');
      });
  });

  xit('should destroy saved item from DB on click', function() {

  });

  it('should destroy note from view on click of delete button', function() {
    app.client.click('.save-note-button');
    app.client.click('.save-note-button');
    app.client.click('.delete-note-button');
    return app.client.waitUntilWindowLoaded()
      expect('foobar').to.have.lengthOf(1);
    });
});
