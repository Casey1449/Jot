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
      <button className='note-save-button' onClick={ props.saveNote }>Save note</button>
      <button onClick={ props.destroyNote }>Delete note</button>
      <button onClick={ props.startNewNote }>Add new note</button>

    </section>
  )
}
