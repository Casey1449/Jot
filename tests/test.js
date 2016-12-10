var Application = require('spectron').Application
var expect = require('chai').expect;
var assert = require('chai').assert;
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const [ Note ] = require('../db');

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

var appPath = path.join(__dirname, '..');

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('App starts and has correct title and buttons', function () {
  beforeEach(() => {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  afterEach(() => {
      return app.stop();
  });

  it('opens a window', () => {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1);
  });
});


describe('Note update', function () {
  beforeEach(() => {
    app = new Application({ path: electronPath, args: [appPath]});
    return app.start();
  });

  afterEach(() => {
      return app.stop();
  });

  xit('should have a field to edit content', () => {
    return app.client.waitUntilWindowLoaded().getText('.note-input-text')
      .then((buttonText) => {
        assert(buttonText === 'add your note');
    });
  });

  it('should have button to save edited contents', () => {
    return app.client.waitUntilWindowLoaded().getText('.note-save-button')
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
  // var app = null
  beforeEach(() => {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  afterEach(() => {
      return app.stop();
  });

  xit('should render a delete button', () => {

  });

  xit('should destroy saved item from DB on click', () => {

  });

  xit('should destroy note from view on click', () => {

  });
});
