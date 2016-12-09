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
  var app = null
  beforeEach(function () {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  afterEach(function () {
      return app.stop();
  });

  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1);
  });

  it('tests the title', function () {
  return app.client.waitUntilWindowLoaded()
    .getTitle().should.eventually.equal('Jot');
  });

  it('displays an "add notebook" button', function (){
    return app.client.getText('#add-notebook-button').then(function (buttonText) {
    assert(buttonText === 'Create Notebook')
    })
  });

  xit('displays a "save note" button', function (){
    return app.client.getText('#save-markdown').then(function (buttonText) {
    assert(buttonText === 'Save File')
    })
  });

  xit('displays a "delete note" button', function (){
    return app.client.getText('#save-markdown').then(function (buttonText) {
    assert(buttonText === 'Save File')
    })
  });
});
