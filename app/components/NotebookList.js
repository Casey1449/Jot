import React from 'react';

export default (props) => {
  let formShowing = false;
  return (
    <section className='notebook-list'>
      <h1> Notebooks </h1>
      <ul>
        <li>Notebook1</li>
        <li>Notebook2</li>
        <li>Notebook3</li>
      </ul>
      { formShowing ? <section><input placeholder='add notebook' /><button className='create-notebook-button'>Create Notebook</button></section> : <button onClick={() => {!formShowing;} }>Add Notebook</button> }
    </section>
  )
}
