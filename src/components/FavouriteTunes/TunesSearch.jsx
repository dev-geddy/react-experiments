import React, {Component} from 'react'

class TunesSearch extends Component {

  static propTypes = {
    onSubmit: React.PropTypes.func
  }

  resetForm() {
    this.refs.searchTerm.value = ''
  }

  onSubmit(event) {
    event.preventDefault()
    if (this.refs.searchTerm.value) {
      this.props.onSubmit(this.refs.searchTerm.value)
    }
  }

  onKeyUp(event) {
    console.log("On key up: ", event.target.value)
    this.props.onSubmit(event.target.value)
  }

  render() {
    return (
      <form className="note-add-form">
        <fieldset>
          <label>Search term:</label>
          <input type="text" ref="searchTerm" id="field_searchTerm" onKeyUp={this.onKeyUp.bind(this)} placeholder="Enter Artist, Track or Collection name" />
        </fieldset>
        <fieldset>
          <button className="add-button" onClick={this.onSubmit.bind(this)}>Find it!</button>
        </fieldset>
      </form>
    )
  }
}

export default TunesSearch
