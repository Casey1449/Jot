import React from 'react';

export default (props) => {
  return (
    <section className='notes-area'>
      <textarea value='somestringhere' contentEditable />
      <button>Save note</button>
    </section>
  )
}
