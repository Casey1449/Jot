import React from 'react';

export default class NotebookList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formShowing: false,
      notebookName: ''
    };
  }

  toggleForm() {
    this.setState({ formShowing: !this.state.formShowing });
    this.setState({ notebookName: '' });
  }

  updateNotebookName(e){
    this.setState({ notebookName: e.target.value });
  }

  render(){
    return (
      <section className='notebook-list'>
        <h1> Notebooks </h1>
        <ul>
          <li>Notebook1</li>
          <li>Notebook2</li>
          <li>Notebook3</li>
        </ul>
        { this.state.formShowing ?
          <section>
            <input
              onKeyUp={(e) => this.updateNotebookName(e) }
              placeholder='add notebook' />
            <button
              className='create-notebook-button'
              onClick={() => {
                this.props.addNotebook(this.state.notebookName);
                this.toggleForm();
                }
              }
            >Create Notebook</button>
          </section> :
          <button className='add-notebook-button' onClick={() => this.toggleForm() }>Add Notebook</button> }
      </section>
    )
  }
}
