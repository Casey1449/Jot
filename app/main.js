const { nativeImage, clipboard, app, Menu, Tray, dialog, BrowserWindow } = require('electron');


let mainWindow = null;
let tray = null;

const fs = require('fs');

app.on('ready', function() {

  let trayImage = nativeImage.createFromPath('/Users/caseymetz/Turing/Mod4-projects/jot/jot_logo_png.png').resize({width: 16, height: 16});

  let dockImage =  nativeImage.createFromPath('/Users/caseymetz/Turing/Mod4-projects/jot/jot_logo_png.png').resize({width: 300, height: 300});

  app.dock.setIcon(dockImage);

  tray = new Tray(trayImage);

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
  ])

  tray.setToolTip('This is my application');
  tray.setContextMenu(contextMenu)
  mainWindow = new BrowserWindow({
   });

  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('closed', function() {
   mainWindow = null;
  });


  const saveLocal = app.saveLocal = (win, content) => {
    const file = dialog.showSaveDialog(win, {
      title: 'Save File',
      defaultPath: app.getPath('desktop'),
      buttonLabel: 'Save your note 🗒',
      filters: [
        {name: 'All Files', extensions: ['*']}
      ]
    });
    if (!file) { return; }
    fs.writeFileSync(file, content);
  };
});
