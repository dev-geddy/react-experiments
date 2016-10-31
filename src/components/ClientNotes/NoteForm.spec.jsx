import React from 'react'
import { shallow, mount, render } from 'enzyme'
import NoteForm, {NoteForm as NoteFormInstance} from './NoteForm'
import sampleData from '../../sample-data/clients.json'
import sinon from 'sinon'

const props = {
  client: sampleData.clients[0],
  handleSubmit: sinon.spy()
}

const eventMock = {
  preventDefault: () => {}
}

describe('Note form component', () => {
  it('Should render', () => {
    const notesComponent = shallow(<NoteForm {...props} />)
    expect(notesComponent.find("input").length).toEqual(1)
    expect(notesComponent.find("textarea").length).toEqual(1)
    expect(notesComponent.find("button").length).toEqual(1)
  })

  it('Form submit should trigger callback', () => {
    NoteForm.prototype.onSubmit = sinon.spy()

    const notesComponent = mount(<NoteForm {...props} />)
    notesComponent.find("button").at(0).simulate("click", eventMock)
    expect(NoteForm.prototype.onSubmit.calledOnce).toEqual(true)
  })
})