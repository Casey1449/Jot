const { nativeImage, clipboard, app, Menu, Tray, BrowserWindow, ipcMain } = require('electron');
const menubar = require('menubar');
const miniWindow = menubar({width: 600, height: 300, windowPosition: 'topRight', alwaysOnTop: true});

let fullWindow = null;

// const openFullWindow = exports.openFullWindow = function(win){
//   win.loadURL(`file://${__dirname}/index.html`)
//   win.once('ready-to-show', () => {
//     win.show();
//   });
// }

miniWindow.on('ready', function ready(){
  console.log('Application is ready.');

});

miniWindow.on('after-create-window', function (){
  miniWindow.window.loadURL(`file://${__dirname}/index.html`)

});

ipcMain.on('openFull', () => {
  fullWindow = new BrowserWindow({
    show: false
  })
  fullWindow.loadURL(`file://${__dirname}/index.html`)
  fullWindow.once('ready-to-show', () => {
    fullWindow.show();
  });
})





// app.on('ready', function() {
//
// let trayImage = nativeImage.createFromPath('/Users/caseymetz/Turing/Mod4-projects/jot/jot_logo_png.png').resize({width: 16, height: 16});
//   let dockImage =  nativeImage.createFromPath('/Users/caseymetz/Turing/Mod4-projects/jot/jot_logo_png.png').resize({width: 300, height: 300});
// // //
//   app.dock.setIcon(dockImage);
// //
// // //tray
// //   tray = new Tray(trayImage);
// //
// //   const contextMenu = Menu.buildFromTemplate([
// //     {label: 'Item1', type: 'radio'},
// //     {label: 'Item2', type: 'radio'},
// //   ])
//
//   tray.setToolTip('This is my application');
//   tray.setContextMenu(contextMenu)
//
// function showWindow() {
//   if (miniView) {
//     getStatus()
//     retu
//   }
// }

// mainWindow = new BrowserWindow({
//  });

// mainWindow.loadURL(`file://${__dirname}/index.html`)
// mainWindow.on('closed', function() {
//  mainWindow = null;
// });
// });
