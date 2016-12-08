import React from 'react';

const moment = require('moment');

export default (props) => {
  return (
    <section className='note-log'>
      <ul>
        { props.notes ? props.notes.sort((a, b) => b.lastModified - a.lastModified).map(n =>
          <li onClick={() => props.viewNote(n) }>
            <p>{ n.body }</p>
            { moment(n.lastModified).format('MMM D YYYY, h:mm a') }
          </li> ) :
          <p>no notes</p> }
      </ul>
    </section>
  )
}
