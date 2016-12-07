const { app, BrowserWindow } = require('electron');
const db = require('./db');

let mainWindow = null;

app.on('ready', () => {

  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  db.put('name', 'LevelUP', function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error

    // 3) fetch by key
    db.get('name', function (err, value) {
      if (err) return console.log('Ooops!', err) // likely the key was not found

      // ta da!
      console.log('name=' + value)
    })

  db.put('student', 'Madison');
  db.get('student', (err, value) => {console.log(value)});
  })
});
