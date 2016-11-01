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
  preventDefault: sinon.spy()
}

describe('Note form component', () => {
  it('Should render', () => {
    const notesComponent = shallow(<NoteForm {...props} />)
    expect(notesComponent.find("input").length).toEqual(1)
    expect(notesComponent.find("textarea").length).toEqual(1)
    expect(notesComponent.find("button").length).toEqual(1)
  })

  it('Form submit should invoke handleSubmit() with form field values and call resetForm()', () => {
    NoteForm.prototype.resetForm = sinon.spy()

    const notesComponent = mount(<NoteForm {...props} />)
    const testNote = {
      name: 'Mr. Green',
      text: 'Positive client feedback'
    }

    expect(notesComponent.ref('createdBy').prop('value')).toEqual(undefined)
    expect(notesComponent.ref('createdBy').prop('id')).toEqual('field_createdBy')
    expect(typeof notesComponent.ref('createdBy').prop('placeholder')).toEqual("string")

    // set input values
    notesComponent.find('#field_createdBy').node.value = testNote.name
    notesComponent.find('#field_note').node.value = testNote.text

    // expect values to appear in REFs
    expect(notesComponent.ref('createdBy').node.value).toEqual(testNote.name)
    expect(notesComponent.ref('note').node.value).toEqual(testNote.text)

    // simulate form submission
    notesComponent.find("button").at(0).simulate("click", eventMock)

    expect(props.handleSubmit.calledOnce).toEqual(true)

    // what arguments did handleSubmit() receive
    const handleSubmitReceivedArgs = props.handleSubmit.getCall(0).args[0]

    expect(handleSubmitReceivedArgs.clientId).toEqual(sampleData.clients[0].id)
    expect(handleSubmitReceivedArgs.noteData.createdBy).toEqual(testNote.name)
    expect(handleSubmitReceivedArgs.noteData.text).toEqual(testNote.text)

    // reset function has been called
    expect(NoteForm.prototype.resetForm.calledOnce).toEqual(true)
  })
})