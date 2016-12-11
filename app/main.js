const { app, BrowserWindow } = require('electron');

import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

installExtension(REACT_DEVELOPER_TOOLS)
   .then((name) => console.log(`Added Extension:  ${name}`))
   .catch((err) => console.log('An error occurred: ', err));

let mainWindow = null;

app.on('ready', function() {
 mainWindow = new BrowserWindow({
   width: 300,
   height: 300
 });

 mainWindow.loadURL(`file://${__dirname}/index.html`)
 mainWindow.openDevTools();
 mainWindow.on('closed', function() {
   mainWindow = null;
 });
});
