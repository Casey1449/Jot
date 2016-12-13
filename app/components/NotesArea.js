import React from 'react';

export default (props) => {

  return (
    <section className='notes-area'>

      <textarea
        className='note-input-text'
        value={ props.content }
        onChange={ (e) => props.setNote(e) }
        placeholder='add your note'
        />
        <button
          className='delete-note-button'
          onClick={ props.destroyNote }>
          Delete note
        </button>
        <button
          className='new-note-button'
          onClick={ props.startNewNote }>
          Add new note
        </button>
        <button onClick={ props.saveLocal }>Save Local</button>
    </section>
  )
}
