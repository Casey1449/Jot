import React from 'react';

export default (props) => {

  return (
    <section className='notes-area'>

      <textarea className='note-text' autoFocus='true' onChange={ (e) => props.setNote(e) } />
      <button onClick={ props.saveNote }>Save note</button>

    </section>
  )
}
