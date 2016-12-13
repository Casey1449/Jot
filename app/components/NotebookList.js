import React from 'react';
import shortid from 'shortid'

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
        { this.props.notebooks ? this.props.notebooks.map(n => <li
          className='notebook-list-notebook'
          key={shortid.generate()}
          onClick={(e) => this.props.setCurrentNotebook(e)}
          >{n}</li>) : 'no notebooks' }
        </ul>

        { this.state.formShowing ?
          <section className='notebook-create-form'>
            <input
              onKeyUp={(e) => this.updateNotebookName(e) }
              className='add-notebook-input'
              placeholder='add notebook' />
            <button
              className='create-notebook-button'
              onClick={() => {
                this.props.addNotebook(this.state.notebookName);
                this.toggleForm();
                }
              }
            ></button>
          </section> :
          <section className='notebook-create-form'>

            <button className='create-notebook-button' onClick={() => this.toggleForm() }></button>
          </section>}
      </section>
    )
  }
}
