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
      selectedNotebook: null,
      noteContent: '',
      bookShelf: []
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
    };
  }

  loadBookshelf(){
    db.get('bookShelf', (_, userNotebooks) => {
      if(userNotebooks){ this.setState({ bookShelf: [...userNotebooks] }); }
    });
  }

  loadNotes(){
    this.setState({notes: []})
    db.createValueStream()
    .on('data', (data) => {
      if(!Array.isArray(data)){
        console.log(data);
        this.setState({ notes: this.state.notes.concat(data) })
      }
    })
  }

  saveNote(){
    const currentNote = this.state.selectedNote;
    const content = this.state.noteContent;
    if(!content) { return; }
    if(!currentNote) {
      let note = new Note(content, this.state.selectedNotebook);
      this.setState({ selectedNote: note });
      db.put(note.id, note);
    } else {
      currentNote.body = content;
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

  addNotebook(notebook){
    const notebooks = this.state.bookShelf;
    this.setState({ bookShelf:  notebooks.concat(notebook) });
  }

  setCurrentNotebook(e){
    this.setState({ selectedNotebook: e.target.innerHTML });
  }

  render(){
    return(
      <div className='main-wrapper'>
        <NotebookList
          notebooks = { this.state.bookShelf }
          addNotebook = {(n) => this.addNotebook(n) }
          setCurrentNotebook = {(e) => this.setCurrentNotebook(e)}
        />
        <NoteLog
          selectedNotebook = {this.state.selectedNotebook}
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
