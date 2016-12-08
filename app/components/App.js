import React from 'react';

import NotebookList from './NotebookList';
import NoteLog from './NoteLog';
import NotesArea from './NotesArea';

const [ Note, db ] = require('../db');

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      notes: []
    };
  }

  componentDidMount(){
    const note = new Note('body');
    db.put('journal', note, () => {
      db.get('journal',
      (err, value) => this.setState({ notes: [ value ] }))
    });
  }

  render(){
    return(
      <div className='main-wrapper'>
        <NotebookList />
        <NoteLog notes = { this.state.notes } />
        <NotesArea />
        { this.state.notes.body }
      </div>
    );
  }
}
