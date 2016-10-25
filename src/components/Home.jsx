import React, {Component} from 'react'
import {Link} from 'react-router'
class Home extends Component {

  render() {
    return (
      <article className="page">
        <header>
          <h2>Client notes application</h2>
        </header>
        <section className="page-content">
          <h3>Shortly About</h3>
          <p>Application is built to manage client notes and store them on browser local storage.</p>
          <p>Expected functionality:</p>
          <ul>
            <li>See list of clients (companies)</li>
            <li>Pick company</li>
            <li>See list of notes taken</li>
            <li>Be able to add notes for selected company</li>
            <li>Notes can not be added if "Note creator" or "Note" is missing.</li>
            <li>No error handling has been implemented.</li>
          </ul>
          <p>Take me to <Link to="notes">Notes</Link>.</p>
        </section>
      </article>
    )
  }
}

export default Home
