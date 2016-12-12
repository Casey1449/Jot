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
      app = new Application({ path: electronPath, args: [appPath], startTimeout: 6000, waitTimeout: 6000 });
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

  xit('displays a "save note" button', function (){
    return app.client.getText('.save-note-button').then(function (buttonText) {
      assert(buttonText === 'Save note');
    });
  });

  it('displays a "delete note" button', function (){
    return app.client.getText('.delete-note-button').then(function (buttonText) {
      assert(buttonText === 'Delete note');
    });
  });

  it('should display a textfield to edit content', function() {
    return app.client.waitUntilWindowLoaded()
      .then(function(newText){
        expect('.note-input-text').to.exist;
    });
  });

  it('should display of log', function() {
    return app.client.waitUntilWindowLoaded()
      .then(function(){
        expect('.note-log').to.exist;
    });
  });

  it('should display of log with all notes', function() {
    return app.client.waitUntilWindowLoaded()
      .then(function(newText){
        expect('.note-log--note').to.have.length.above(0);
    });
  });
});

describe('App allows user to create and save notes', function () {

  let app = null;

  before(function () {
      app = new Application({ path: electronPath, args: [appPath], startTimeout: 6000, waitTimeout: 6000 });
            return app.start();
  });

  after(function () {
    return app.stop();
  });

  it('should allow user to add a note', function () {
    app.client.click('.save-note-button');
    return app.client.waitUntilWindowLoaded()
      expect('.note-log--note').to.have.lengthOf(1);
  });

  xit('should save added note', function () {
    app.client.click('.save-note-button');
    return app.client.waitUntilWindowLoaded()
      expect('.note-log--note').to.have.lengthOf(1);
  });
});

describe('App allows user to read previous notes', function () {

  let app = null;

  before(function () {
      app = new Application({ path: electronPath, args: [appPath], startTimeout: 6000, waitTimeout: 6000 });
            return app.start();
  });

  after(function () {
    return app.stop();
  });

  it('should render all new added notes', function () {
    app.client.click('.save-note-button');
    app.client.click('.save-note-button');
    return app.client.waitUntilWindowLoaded()
      expect('.note-log--note').to.have.lengthOf(2);
    });

  xit('should render added notes from db', function () {
  });
});


describe('Note update', function () {

  let app = null;

  before(function() {
    app = new Application({ path: electronPath, args: [appPath], startTimeout: 6000, waitTimeout: 6000 });
      return app.start();
  });

  after(function() {

      return app.stop();
  });

  xit('should have button to save edited contents', function() {
    return app.client.waitUntilWindowLoaded().getText('.save-note-button')
      .then(function(buttonText) {
        assert(buttonText === 'Save note');
    });
  });

  xit('should update the proporty, date last modified of note when edited', function() {
    app.client.click('.save-note-button');
    app.client.click('.save-note-button');
    return app.client.waitUntilWindowLoaded()
      .then(function(note) {
        assert.property(note);
    });
  });

  it('should reorder list items with most recently edited at the top', function() {
    return app.client.waitUntilWindowLoaded().getText('.delete-note-button')
      .then(function(buttonText) {
        assert(buttonText === 'Delete note');
      });
  });

  xit('should save changes to DB', function(){

  });

  xit('should reflect changes within the render method', function(){
  });

});

describe('Note delete', function () {

  var app = null;

  before(function() {
      app = new Application({ path: electronPath, args: [appPath], startTimeout: 6000, waitTimeout: 6000 });
      return app.start();
  });

  after(function() {
      return app.stop();
  });

  it('should render a delete button', function() {
    return app.client.waitUntilWindowLoaded().getText('.delete-note-button')
      .then(function(buttonText) {
        assert(buttonText === 'Delete note');
      });
  });

  it('should destroy note from view on click of delete button', function() {
    app.client.click('.save-note-button');
    app.client.click('.save-note-button');
    app.client.click('.delete-note-button');
    return app.client.waitUntilWindowLoaded()
      expect('.note-log--note').to.have.lengthOf(1);
  });

  xit('should destroy saved item from DB on click', function() {

  });
});
