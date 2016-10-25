import React, {Component} from 'react'

class Home extends Component {

  render() {
    return (
      <article className="page">
        <header>
          <h2>Client notes application</h2>
        </header>
        <section className="page-content">
          <h3>Shortly About</h3>
          <p>Application is built to manipulate client notes on browser local storage.</p>
        </section>
      </article>
    )
  }
}

export default Home
