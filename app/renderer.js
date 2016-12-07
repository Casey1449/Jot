import React from 'react';
import ReactDOM from 'react-dom';
import NotebookList from './components/notebookList';
import NotesArea from './components/NotesArea';

class App extends React.Component {

  render(){
    return (
      <div className='main-wrapper'>
        <NotebookList />
        <NotesArea />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
