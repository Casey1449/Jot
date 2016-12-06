import React, { Component } from 'react';

export default class Tester extends Component {
  constructor(props) {
    super();
    this.state = {
      count: 0
    }
  }

  render() {
    const { count } = this.state;
    return (
      <p>Testing {count}
        <button onClick={() => this.setState({ count: count + 1 })}>Wow</button>
      </p>
    )
  }
}
