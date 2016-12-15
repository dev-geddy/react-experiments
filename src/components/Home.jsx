import React, {Component} from 'react'
import {Link} from 'react-router'
class Home extends Component {

  render() {
    return (
      <article className="page">
        <header>
          <h2>Experiments application</h2>
          <p>Application features details</p>
        </header>
        <section className="page-content">
          <h3>Notes component</h3>
          <p><Link to="/notes">Notes</Link> component is built to manage client notes and store them on browser local storage.</p>
          <p>Expected functionality:</p>
          <ul>
            <li>See list of clients (companies)</li>
            <li>Pick company</li>
            <li>See list of notes taken</li>
            <li>Be able to add notes for selected company</li>
            <li>Notes can not be added if "Note creator" or "Note" is missing</li>
            <li>No error handling has been implemented</li>
          </ul>
          <h3>Locations component</h3>
          <p><Link to="/locations">Locations</Link> component is built to manage client notes and store them on browser local storage.</p>
          <p>Expected functionality:</p>
          <ul>
            <li>Use Google Maps API</li>
            <li>Search locations</li>
            <li>Add locations to your route</li>
            <li>Display distance and duration of every waypoint</li>
            <li>No error handling implementation</li>
            <li>Max 10 waypoints limit</li>
          </ul>
        </section>
      </article>
    )
  }
}

export default Home
