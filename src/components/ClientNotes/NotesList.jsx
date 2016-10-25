import React, {Component} from 'react'

class NotesList extends Component {

  static propTypes = {
    notes: React.PropTypes.array
  }

  renderNotes(notes) {
    return notes.map((note, index)=>{
      return (
        <article key={index} className="notes-list__note">
          <p>{note.text}</p>
          <footer>Created by <strong>{note.createdBy}</strong> at <em>{note.createdAt}</em></footer>
        </article>
      )
    })
  }

  render() {
    const {
      notes
    } = this.props
    return (
      <section className="notes-list">
        {this.renderNotes(notes)}
      </section>
    )
  }
}

export default NotesList
