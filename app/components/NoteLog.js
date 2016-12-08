import React from 'react';

const moment = require('moment');

export default (props) => {
  console.log(props);
  return (
    <section className='note-log'>
      <ul>
        { props.notes.map(n => <li>{ moment(n.timeStamp).format('MMM D YYYY, h:mm a') }</li> ) }
      </ul>
    </section>
  )
}
