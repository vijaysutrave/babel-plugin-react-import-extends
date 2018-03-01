# babel-plugin-react-import-extends

> Write React Components without having to `extend React.Component` or importing React with every Component.

Have you ever wondered how easy it would be to get rid of the annoying ...`extends React.Component` and not having to manually import React with every component that you write?

Enter `babel-plugin-react-import-extends`

This babel plugin auto-magically extends a "React Component", and imports React within the component if the detects the file type to be a React Component, so that you don't have to repeat that annoying stuff anymore, yay!

Now with support to `PureComponent`!
Note that it supports anything you pass in - not just `PureComponent` -, so be careful!


## Install
`npm install --save-dev babel-plugin-react-import-extends`


## Usage
Add the plugin to the plugins list in your `.babelrc` file

### Via `.babelrc` (recommended):

```
{
  plugins: [
    ...otherPlugins,
    ["react-import-extends", {
      extends: "PureComponent" // not necessary, defaults to Component
    }]
  ]
}
```

### Via CLI
`babel --plugins react-import-extends script.js`


## Standard Input & Output Examples

####  1. With a Stateful Component

**In**

```
class StatefulComponent {
  componentDidMount() {
    console.log('mounted')
  }

  render() {
    return (
      <div className="test">
        Hello!
      </div>
    )
  }
}
export default StatefulComponent;
```

**Out**
```
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
export default StatefulComponent;
```


#### 2. With functional components

**In**
```
const StatelessComponent = () => {
  return (
    <div className="test">
      Hello!
    </div>
  )
}

export default StatelessComponent;
```

**Out**
```
import React, {PropTypes, Component} from "react";
const StatelessComponent = () => {
  return <div className="test">
      Hello!
    </div>;
};

export default StatelessComponent;
```

## Todo
- Options to add more imports


## License
MIT © [vijaysutrave](https://github.com/vijaysutrave)
