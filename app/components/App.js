import React from 'react';

import NotebookList from './NotebookList';
import NoteLog from './NoteLog';
import NotesArea from './NotesArea';

const [ Note, db ] = require('../db');

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      notes: [],
      noteContent: ''
    };
  }

  componentDidMount(){
    this.loadNotes();
  }

  loadNotes(){
    db.createValueStream()
    .on('data', (data) => this.setState({ notes: this.state.notes.concat(data) }))
  }

  saveNote(){
    console.log(this.state.noteContent);
    let note = new Note(this.state.noteContent);
    db.put(note.id, note, (note) => this.setState({ notes: this.state.notes.concat(note)}));
  }

  setNote(e){
    this.setState({ noteContent: e.target.value });
  }


  render(){
    console.log('rendering')
    return(
      <div className='main-wrapper'>
        <NotebookList />
        <NoteLog notes = { this.state.notes } />
        <NotesArea saveNote={ () => this.saveNote() }
                  setNote={ (e) => this.setNote(e) }/>
        { this.state.notes.body }
      </div>
    );
  }
}
