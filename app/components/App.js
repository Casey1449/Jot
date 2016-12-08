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
    let note = new Note('newnote');
    db.put(note.id, note, () => {
      db.createValueStream()
        .on('data', (data) => this.setState({ notes: this.state.notes.concat(data) }))
      })
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
