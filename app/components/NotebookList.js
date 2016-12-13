import React from 'react';
import shortid from 'shortid';

export default class NotebookList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formShowing: false,
      notebookName: ''
    };
  }

  toggleForm(){
    this.setState({ formShowing: !this.state.formShowing });
    this.setState({ notebookName: '' });
  }

  add(){
    this.props.addNotebook(this.state.notebookName);
    this.toggleForm()
  }

  updateNotebookName(e){
    e.which = e.which || e.keyCode;
    e.which === 13 ? this.add() :
    this.setState({ notebookName: e.target.value });
  }

  render(){
    return (
      <section className='notebook-list'>
        <h1>Notebooks</h1>
        <ul>
        { this.props.notebooks ? this.props.notebooks.map(n => <li
          key={shortid.generate()}
          onClick={ (e) => this.props.setCurrentNotebook(e) }
          className={ `notebook-list-notebook ${this.props.currentNotebook && this.props.currentNotebook === n? 'notebook-is-active' : ''}` }
          >{n}</li>) : 'no notebooks' }
        </ul>
        { this.state.formShowing ?
          <section className='notebook-create-form'>
            <input
              onKeyUp={ (e) => this.updateNotebookName(e) }
              className='add-notebook-input'
              placeholder='add notebook' />
            <button
              className='create-notebook-button'
              onClick={ () => add() }
            ></button>
          </section> :
          <section className='notebook-create-form'>
            <button className='create-notebook-button' onClick={ () => this.toggleForm() }></button>
          </section>}
      </section>
    )
  }
}
