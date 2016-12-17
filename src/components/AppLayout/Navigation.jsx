import React, {Component} from 'react'
import {Link} from 'react-router'

class Navigation extends Component {
  render() {
    const {
      activeLocation,
      onNavigation
      } = this.props
    return (
      <div className="app-navigation">
        <Link className={activeLocation === '/' ? 'current' : 'home'} to="/" onClick={onNavigation.bind(this)}>Home</Link>
        <Link activeClassName="current" to="/notes" onClick={onNavigation.bind(this)}>Notes</Link>
        <Link activeClassName="current" to="/tunes" onClick={onNavigation.bind(this)}>Favourite tunes</Link>
        <Link activeClassName="current" to="/locations" onClick={onNavigation.bind(this)}>Locations</Link>
      </div>
    )
  }
}

export default Navigation
