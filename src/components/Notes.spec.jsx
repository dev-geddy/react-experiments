import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Notes, {Notes as NotesInstance} from './Notes'
import sampleData from '../sample-data/clients.json'
import sinon from 'sinon'
// jest.dontMock('./ClientNotes/ClientNotes.scss')

// mock local storage for jest...
let store = {
  clientsNotes: JSON.stringify(sampleData.clients)
}

window.localStorage = {
  getItem: function (key) {
    return store[key];
  },
  setItem: function (key, value) {
    store[key] = value.toString();
  },
  clear: function () {
    store = {};
  }
}
// end of localStorage mock

const eventMock = {
  preventDefault: () => {}
}

describe('Notes component', () => {

  it('Should render',()=>{
    const notesComponent = shallow(<Notes />)
    expect(typeof notesComponent).toEqual('object')
  })

  it('Should contain clients list', () => {
    const notesComponent = shallow(<Notes />)
    expect(notesComponent.find('ClientsList').length).toEqual(1)

  })

  it('Should not contain note form and notes initially', () => {
    const notesComponent = shallow(<Notes />)
    expect(notesComponent.find('NoteForm').length).toEqual(0)
    expect(notesComponent.find('NotesList').length).toEqual(0)
  })

  it('Clients list should be selectable', () => {
    sinon.spy(Notes.prototype, 'onClientSelect');
    const notesComponent = shallow(<Notes />)


    expect(notesComponent.find('ClientsList').shallow().find(".clients-list article").first().length).toEqual(1)
    notesComponent.find('ClientsList').shallow().find(".clients-list article").first().simulate("click", eventMock)

    expect(Notes.prototype.onClientSelect.calledOnce).toEqual(true);

    // expect(notesComponent.find('NoteForm').length).toEqual(1)
    // expect(notesComponent.find('NotesList').length).toEqual(1)
  })

  it('Clients list selection should reveal form and notes', () => {

    const notesComponent = shallow(<Notes />)
    // Notes.prototype.setState({activeClient: sampleData.clients[0]})

    expect(notesComponent.find('ClientsList').shallow().find(".clients-list article").first().length).toEqual(1)
    notesComponent.find('ClientsList').shallow().find(".clients-list article").first().simulate("click", eventMock)

    expect(notesComponent.find('NoteForm').length).toEqual(1)
    expect(notesComponent.find('NotesList').length).toEqual(1)
  })


})