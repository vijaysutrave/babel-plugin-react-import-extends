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
