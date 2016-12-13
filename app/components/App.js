import React from 'react';
import NotebookList from './NotebookList';
import NoteLog from './NoteLog';
import NotesArea from './NotesArea';

const { Note, devDB, testDB } = require('../db');
let db = devDB;

if (process.env.NODE_ENV === 'test') {
  db = testDB;
}

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      notes: [],
      selectedNote: null,
      selectedNotebook: 'all',
      noteContent: '',
      bookShelf: ['all']
    };
  }

  componentWillMount(){
    this.loadBookshelf();
  }

  componentDidMount(){
    this.loadNotes();
  }

  componentDidUpdate(){
    if(this.state.bookShelf.length > 0){
    db.put('bookShelf', this.state.bookShelf);
    }
  }

  loadBookshelf(){
    db.get('bookShelf', (_, userNotebooks) => {
      if(userNotebooks){ this.setState({ bookShelf: [...userNotebooks] }); }
    });
  }

  loadNotes(){
    this.setState({ notes: [] });
    db.createValueStream().on('data', (data) => {
      if(!Array.isArray(data)){
        this.setState({ notes: this.state.notes.concat(data) });
      }
    });
  }

  saveNote(content){
    const currentNote = this.state.selectedNote;
    if(!content) { return; }
    if(!currentNote) {
      let note = new Note(content, this.state.selectedNotebook);
      this.setState({ selectedNote: note });
      this.setState({ notes: this.state.notes.concat(note) });
      db.put(note.id, note);
    } else {
      currentNote.body = content;
      currentNote.lastModified = Date.now();
      db.put(currentNote.id, currentNote);
    }
  }

  destroyNote(){
    const currentNote = this.state.selectedNote;
    this.setState({ notes: this.state.notes.filter(n =>  n.id !==currentNote.id) });
    db.del(currentNote.id);
    this.startNewNote();
  }

  setNote(e){
    this.setState({ noteContent: e.target.value });
    this.saveNote(e.target.value);
  }

  viewNote(n){
    this.setState({ selectedNote: n });
    this.setState({ noteContent: n.body });
  }

  startNewNote(){
    this.setState({ selectedNote: null });
    this.setState({ noteContent: '' });
  }

  addNotebook(notebook){
    const notebooks = this.state.bookShelf;
    this.setState({ bookShelf:  notebooks.concat(notebook) });
  }

  setCurrentNotebook(e){
    this.setState({ selectedNotebook: e.target.innerHTML });
    this.startNewNote();
  }

  saveLocal() {
    const { remote } = require('electron');
    const mainProcess = remote.app;
    const currentWindow = remote.getCurrentWindow();
    mainProcess.saveLocal(currentWindow, this.state.noteContent);
  }

  render(){
    return(
      <div className='main-wrapper'>
        <section className='main-notebook-options'>
          <NotebookList
            notebooks = { this.state.bookShelf }
            addNotebook = {(n) => this.addNotebook(n) }
            setCurrentNotebook = {(e) => this.setCurrentNotebook(e)}
            currentNotebook = { this.state.selectedNotebook }
          />
          <NoteLog
            selectedNotebook = { this.state.selectedNotebook }
            noteContent = { this.state.noteContent }
            notes = { this.state.notes }
            viewNote ={ (n) => this.viewNote(n) }
            currentNote={this.state.selectedNote}
          />
        </section>
        <NotesArea saveNote={ () => this.saveNote() }
                  destroyNote={ () => this.destroyNote() }
                  setNote={ (e) => this.setNote(e) }
                  content={ this.state.noteContent }
                  startNewNote = { () => this.startNewNote() }
                  saveLocal = { () => this.saveLocal() }
        />
      </div>
    );
  }
}
