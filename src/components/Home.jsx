import React, {Component} from 'react'
import {Link} from 'react-router'

class Home extends Component {
  render() {
    return (
      <article className="page">
        <header>
          <h2>Experiments application</h2>
          <p>Intro to application features</p>
        </header>
        <section className="page-content">
          <h3>Notes</h3>
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
          <hr />
          <h3>Favourite tunes</h3>
          <p><Link to="/tunes">Favourite tunes</Link> component objectives are to search iTunes store and build the list of your own Favourites.</p>
          <p>Expected section functionality:</p>
          <ul>
            <li>Search iTunes store</li>
            <li>Search results should be limited by max 10 records</li>
            <li>Build your Favourites list by picking songs from iTunes search results</li>
            <li>Call to iTunes is not expected to work for now.</li>
            <li>Single collection of results, based on mocked data.</li>
          </ul>
          <hr />
          <h3>Locations</h3>
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
