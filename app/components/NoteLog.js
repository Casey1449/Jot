import React from 'react';
import moment from 'moment';

export default (props) => {
  let notes = [];

  props.selectedNotebook !== 'all' ?
    notes = props.notes.filter(n => n.notebook === props.selectedNotebook) : notes = props.notes;
  return (
    <section className='note-log'>
      <ul>
      { notes ? notes.sort((a, b) => b.lastModified - a.lastModified).map(n =>
        <li
          key={ n.id }
          onClick={ () => props.viewNote(n) }
          className={ `note-log-note ${props.currentNote && props.currentNote.id === n.id ? 'note-is-active' : ''}` }>
          <p className='note-log-note-body'>{ n.body }</p>
          <p className='note-log-note-date'>
            { moment(n.lastModified).format('MMM D YYYY') }
          </p>
        </li> ) :
        <p>no notes</p> }
      </ul>
    </section>
  )
}
