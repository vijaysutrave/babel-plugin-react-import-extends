import React, {PropTypes, Component} from "react";
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
