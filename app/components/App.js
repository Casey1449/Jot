import React from 'react';

import NotebookList from './NotebookList';
import NoteLog from './NoteLog';
import NotesArea from './NotesArea';

export default class App extends React.Component {
  render(){
    return(
      <div className='main-wrapper'>
        <NotebookList />
        <NoteLog />
        <NotesArea />
      </div>
    );
  }
}
