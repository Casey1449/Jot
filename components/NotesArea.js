import React from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
  return (
    <section className='notes-area'>
      <textarea className='note-text' autoFocus='true' />
      <button>Save note</button>
    </section>
  )
}
