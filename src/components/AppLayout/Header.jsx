import React, {Component} from 'react'

class Header extends Component {
  render() {
    return (
      <header id="appHeader">
        <div className="logo">
          <i className="material-icons">library_books</i>
          <div className="great-title">
            <strong>React Notes</strong>
            <small>React/ES6</small>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
