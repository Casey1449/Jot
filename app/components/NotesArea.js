import React from 'react';

export default (props) => {

  return (
    <section className='notes-area'>

      <textarea
        onBlur={ props.saveNote }
        className='note-text'
        value={ props.content }
        onChange={ (e) => props.setNote(e) }
        placeholder='add your note'
        />
      <button
        className='save-note-button'
        onClick={ props.saveNote }>
        Save note
      </button>
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
    </section>
  )
}
