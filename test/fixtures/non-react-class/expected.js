import React, {PropTypes, Component} from 'react';
class StatefulComponent extends Component {
  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return <div className="test">
        Hello!
      </div>;
  }
}

class Person {
  constructor() {
    this.name = 'vijay';
  }
  name() {
    return this.name;
  }
}

export {
  StatefulComponent,
  Person
}
