const {
  nativeImage,
  clipboard,
  app,
  Menu,
  Tray,
  dialog,
  BrowserWindow
} = require('electron');

const template = require('./helpers/menu-bar-template');
let mainWindow = null;
let tray = null;
const fs = require('fs');

app.on('ready', function() {
 mainWindow = new BrowserWindow({ title: 'JOT' });
   const menu = Menu.buildFromTemplate(template);
   Menu.setApplicationMenu(menu);
// for design dev work, not to be included in production
  let trayImage = nativeImage.createFromPath('/Users/caseymetz/Turing/Mod4-projects/jot/jot_logo_png.png').resize({width: 16, height: 16});

  // for design dev work, not to be included in production
  let dockImage =  nativeImage.createFromPath('/Users/caseymetz/Turing/Mod4-projects/jot/jot_logo_png.png').resize({width: 300, height: 300});

  app.dock.setIcon(dockImage);

  tray = new Tray(trayImage);

  mainWindow.loadURL(`file://${__dirname}/index.html`);
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

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  });
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  );
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ];
}
