import React, {Component} from 'react'
import {Link} from 'react-router'

class NotFound extends Component {
  render() {
    return (
      <article className="page">
        <header>
          <h2>404 Not Found</h2>
          <p>The resource yoy were looking for is not found.</p>
        </header>
        <section className="page-content">
          <h1>404 Not Found</h1>
          <p>The URL you have landed or manually entered does not exist on this project.</p>
          <p>You may start your browsing from <Link to="/">Home</Link>.</p>
        </section>
      </article>
    )
  }
}

export default NotFound
