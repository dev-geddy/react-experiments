import React, {Component} from 'react'
import moment from 'moment'

class NoteForm extends Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func,
    client: React.PropTypes.object
  }

  resetForm() {
    this.refs.note.value = ''
    this.refs.createdBy.value = ''
  }

  onSubmit(event) {
    event.preventDefault()
    if (this.refs.note.value && this.refs.createdBy.value) {
      const currentTime = moment().format('LLLL') // quickly get nice date/time display from moment.js library
      const newNote = {
        clientId: this.props.client.id,
        noteData: {
          createdBy: this.refs.createdBy.value,
          createdAt: currentTime,
          text: this.refs.note.value
        }
      }
      this.props.handleSubmit(newNote)
      this.resetForm()
    }
  }

  render() {
    console.log("Note form...")
    return (
      <form className="note-add-form">
        <fieldset>
          <label>Note creator:</label>
          <input type="text" ref="createdBy" id="field_createdBy" />
        </fieldset>
        <fieldset>
          <label>Note:</label>
          <textarea ref="note" id="field_note" />
        </fieldset>
        <fieldset>
          <button className="add-button" onClick={this.onSubmit.bind(this)}>Add note!</button>
        </fieldset>
      </form>
    )
  }
}

export default NoteForm
