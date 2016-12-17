import React, {Component} from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
    this.icons = [
      'looks_6',
      'looks_5',
      'looks_4',
      'looks_3',
      'looks_two',
      'looks_one',
      'developer_board',
      'devices',
      'sentiment_neutral',
      'sentiment_satisfied',
      'sentiment_very_satisfied',
      'whatshot',
      'whatshot',
      'whatshot',
      'whatshot',
      'whatshot'
    ]
    this.iconChangeTimer = null
    this.iconAnimateTimer = null
    this.state = {
      icon: this.icons[0],
      iconIndex: 0,
      animate: false
    }
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.icon !== this.state.icon) {
      return true
    }
    return false
  }

  changeIcon() {
    const newIndex = this.state.iconIndex >= this.icons.length - 1 ? 0 : ++this.state.iconIndex
    this.setState({
      icon: this.icons[newIndex],
      iconIndex: newIndex,
      animate: true
    })
    this.iconAnimateTimer = setTimeout(() => {
      this.animateIcon()
    }, 250)
  }

  animateIcon() {
    this.setState({
      animate: false
    })
    this.forceUpdate()
  }

  componentDidMount() {
    this.iconChangeTimer = setInterval(()=> {
      this.changeIcon()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.iconChangeTimer)
    clearTimeout(this.iconAnimateTimer)
  }

  render() {
    const { icon, animate } = this.state
    return (
      <header id="appHeader">
        <div className="logo">
          <i className={"material-icons" + (animate === true ? ' animate': '')}>{icon}</i>
          <div className="great-title">
            <strong>React Experiments</strong>
            <small>React/ES6/Flux/Redux</small>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
