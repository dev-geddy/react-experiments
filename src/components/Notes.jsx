import React, { Component } from 'react'
import sampleData from '../sample-data/clients.json'
import ClientsList from './ClientNotes/ClientsList'
import NotesList from './ClientNotes/NotesList'
import NoteForm from './ClientNotes/NoteForm'
import './ClientNotes/ClientNotes.scss'

class Notes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      clients: [],
      activeClient: {}
    }
  }

  componentWillMount() {
    this.setState({
      clients: sampleData.clients
    })
  }

  componentWillUnmount() {
    this.state = {}
  }

  onClientSelect(client) {
    this.setState({
      activeClient: client
    })
  }

  addNewNote(newNote) {
    console.log("new note:", newNote)
  }

  render() {
    const {
      clients,
      activeClient
    } = this.state

    console.log("Clients: ", clients)
    console.log("Active Client: ", activeClient)

    return (
      <article className="page">
        <header>
          <h2>Clients and notes</h2>
          <p>Add notes to clients.</p>
        </header>
        <div className="page-content contains-columns">
          <div className="row">
            <div className="column large-4">
              <h2>Clients</h2>
              <ClientsList clients={clients} onClientSelect={this.onClientSelect.bind(this)} activeClient={activeClient} />
            </div>
            <div className="column large-8">
              <h2>Notes</h2>
              {!activeClient.id && <p>Pick a client to see or add notes.</p>}
              {activeClient.id && <NoteForm client={activeClient} handleSubmit={this.addNewNote.bind(this)} />}
              {activeClient.id && <NotesList notes={activeClient.notes || []} />}
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default Notes
