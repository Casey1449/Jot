import React from 'react';

export default (props) => {

  return (
    <section className='notes-area'>

      <textarea
        className='note-text'
        value={ props.content }
        onChange={ (e) => props.setNote(e) }
        placeholder='add your note'  
        />
      <button onClick={ props.saveNote }>Save note</button>

    </section>
  )
}
