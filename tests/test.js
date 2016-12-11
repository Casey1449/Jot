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
    assert(buttonText === 'Add Notebook')
    })
  });

  it('displays a "save note" button', function (){
    return app.client.getText('.save-note-button').then(function (buttonText) {
    assert(buttonText === 'Save note')
    })
  });

  it('displays a "delete note" button', function (){
    return app.client.getText('.delete-note-button').then(function (buttonText) {
    assert(buttonText === 'Delete note')
    })
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

  it('', function () {

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

  it('', function () {

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

  xit('should have a field to edit content', () => {
    return app.client.waitUntilWindowLoaded().getText('.note-input-text')
      .then((buttonText) => {
        assert(buttonText === 'add your note');
    });
  });

  it('should have button to save edited contents', () => {
    return app.client.waitUntilWindowLoaded().getText('.save-note-button')
      .then((buttonText) => {
        assert(buttonText === 'Save note');
    });
  });

  it('should update date last modified on click of save', () => {
    let testNote = new Note('content');
    const id = note.id;
    db.put(id, testNote);
  });

  xit('should reorder list items with most recently edited at the top', () => {

  });

  xit('should save changes to DB', () => {

  });
});

describe('Note delete', function () {
  var app = null
  before(function() {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  after(function() {
      return app.stop();
  });

  xit('should render a delete button', () => {

  });

  xit('should destroy saved item from DB on click', () => {

  });

  xit('should destroy note from view on click', () => {

  });
});
