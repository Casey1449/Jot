import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'


const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({label: 'JOT', submenu: [
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
]}));

menu.append(new MenuItem({label: 'New Note', click() { console.log('New note') }}));
menu.append(new MenuItem({label: 'New Notebook', click() {
  console.log('add notebook');
}}));

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);

ReactDOM.render(<App />, document.querySelector('#app'));
