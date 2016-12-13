const { nativeImage, clipboard, app, Menu, Tray, dialog, BrowserWindow } = require('electron');

let mainWindow = null;
let tray = null;

const fs = require('fs');

app.on('ready', function() {
 mainWindow = new BrowserWindow({ title: 'Jot' });
   const menu = Menu.buildFromTemplate(template);
   Menu.setApplicationMenu(menu);
   mainWindow.setTitle('JOT');

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

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        role: 'reload'
      },
      {
        role: 'toggledevtools'
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  }
];

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
  // Edit menu.
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
  // Window menu.
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
