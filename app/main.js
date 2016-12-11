const { app, BrowserWindow } = require('electron');
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  // mainWindow.addDevToolsExtension('~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.4');
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
