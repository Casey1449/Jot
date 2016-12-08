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
      selectedNote: null,
      noteContent: ''
    };
  }

  componentDidMount(){
    this.loadNotes();
  }

  loadNotes(){
    this.setState({notes: []})
    db.createValueStream()
    .on('data', (data) => this.setState({ notes: this.state.notes.concat(data) }))
  }

  saveNote(){
    const currentNote = this.state.selectedNote;
    if(!currentNote) {
      let note = new Note(this.state.noteContent);
      db.put(note.id, note);
    } else {
      currentNote.body = this.state.noteContent;
      currentNote.lastModified = Date.now();
      db.put(currentNote.id, currentNote);
    }
    this.loadNotes();
  }

  destroyNote(){
    const currentNote = this.state.selectedNote;
    db.del(currentNote.id);
    this.loadNotes();
    this.startNewNote();
  }

  setNote(e){
    this.setState({ noteContent: e.target.value });
  }

  viewNote(n){
    this.setState({ selectedNote: n });
    this.setState({ noteContent: n.body });
  }

  startNewNote(){
    this.setState({ selectedNote: null });
    this.setState({ noteContent: '' });
  }

  render(){
    return(
      <div className='main-wrapper'>
        <NotebookList />
        <NoteLog
          notes = { this.state.notes }
          viewNote ={(n) => this.viewNote(n) }
        />
        <NotesArea saveNote={ () => this.saveNote() }
                  destroyNote={ () => this.destroyNote() }
                  setNote={ (e) => this.setNote(e) }
                  content={ this.state.noteContent }
                  startNewNote = { () => this.startNewNote() }/>
      </div>
    );
  }
}
