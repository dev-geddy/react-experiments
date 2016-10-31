import React, { Component } from 'react'
import sampleData from '../sample-data/clients.json'
import ClientsList from './ClientNotes/ClientsList'
import NotesList from './ClientNotes/NotesList'
import NoteForm from './ClientNotes/NoteForm'
// import './ClientNotes/ClientNotes.scss'
import _findIndex from 'lodash/findIndex'

export class Notes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      clients: [],
      activeClient: {}
    }
  }

  hasStoredData() {
    return localStorage.getItem('clientsNotes') ? true : false
  }

  getStoredData() {
    return JSON.parse(localStorage.getItem('clientsNotes'))
  }

  getSampleData() {
    return sampleData.clients
  }

  storeNewData(newData) {
    localStorage.setItem('clientsNotes', JSON.stringify(newData))
  }

  componentWillMount() {
    this.setState({
      clients: this.hasStoredData() ? this.getStoredData() : this.getSampleData()
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
    // console.log("New note:", newNote)
    // instead of picking up from state, clients list could be taken from local storage, in case of additions via other tabs.

    const appendToIndex = _findIndex(this.state.clients, (client) => {
      return client.id === newNote.clientId
    })

    let newState = {...this.state} // do not mutate original state.
    newState.clients[appendToIndex].notes.push(newNote.noteData)

    this.setState(newState)
    this.storeNewData(newState.clients) // save to local storage, to be available after refresh
  }

  render() {
    const {
      clients,
      activeClient
    } = this.state

    // console.log("Clients: ", clients)
    // console.log("Active Client: ", activeClient)

    return (
      <article className="page">
        <header>
          <h2>Clients and notes</h2>
          <p>Add notes to clients.</p>
        </header>
        <div className="page-content contains-columns">
          <div className="row">
            <div className="column large-4 medium-6 small-12">
              <h2>Clients</h2>
              <ClientsList clients={clients} onClientSelect={this.onClientSelect.bind(this)} activeClient={activeClient} />
            </div>
            <div className="column large-8 medium-6 small-12">
              <h2>{activeClient.name} Notes</h2>
              {!activeClient.id && <p>Pick a client to see or add notes.</p>}
              {activeClient.id && <NoteForm client={activeClient} handleSubmit={this.addNewNote.bind(this)} />}
              {activeClient.id && <h2>Previous notes</h2>}
              {activeClient.id && <NotesList notes={activeClient.notes || []} />}
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default Notes
