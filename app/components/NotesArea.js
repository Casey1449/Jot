import React from 'react';

export default (props) => {
  return (
    <section className='notes-area'>
      <span className='watermark-logo'></span>
      <textarea
        className='note-input-text'
        value={ props.content }
        onChange={ (e) => props.setNote(e) }
        placeholder='add your note'
        />
        <section className='note-area-button-container'>
          <button
            className='new-note-button'
            onClick={ props.startNewNote }>
          </button>
          <button className='save-local-button' onClick={ props.saveLocal }>
          </button>
          <button
          className='delete-note-button'
          onClick={ props.destroyNote }>
          </button>
        </section>
    </section>
  )
}
