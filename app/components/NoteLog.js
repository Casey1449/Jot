import React from 'react';

const moment = require('moment');

export default (props) => {

  let notes = []

  props.selectedNotebook ?
    notes = props.notes.filter(n => n.notebook === props.selectedNotebook) : notes = props.notes;

  return (
    <section className='note-log'>
      <ul>
      { notes ? notes.sort((a, b) => b.lastModified - a.lastModified).map(n =>
        <li key={n.id} onClick={() => props.viewNote(n) }>
          <p>{ n.body }</p>
          { moment(n.lastModified).format('MMM D YYYY, h:mm a') }
        </li> ) :
        <p>no notes</p> }
      </ul>
    </section>
  )
}
