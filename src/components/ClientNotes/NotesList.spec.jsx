import React from 'react'
import { shallow, mount, render } from 'enzyme'
import NotesList, {NotesList as NotesListInstance} from './NotesList'
import sampleData from '../../sample-data/clients.json'
import sinon from 'sinon'

describe('Notes list component', () => {
  it('Should render', () => {
    const props = {
      notes: sampleData.clients[0].notes
    }
    const notesComponent = shallow(<NotesList {...props} />)
    expect(notesComponent.find("article").length).toEqual(2)
    expect(notesComponent.find("article").first().find("p").text()).toEqual('Power of Dreams. Have you checked NSX?')
  })
})