import React from 'react';
import { render } from 'react-dom';
import Tester from './testcomponent';

const App = () => {
  return (
    <div>
      <h1>Jot</h1>
      <Tester/>
    </div>
  )
}

render(<App />, document.querySelector('#app'));
