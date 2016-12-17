import React, {Component} from 'react'

class TunesSearch extends Component {

  static propTypes = {
    onSearch: React.PropTypes.func,
    error: React.PropTypes.string
  }

  resetForm() {
    this.refs.searchTerm.value = ''
  }

  componentWillUnmount() {
    this.resetForm()
  }

  onKeyUp(event) {
    console.log("On key up: ", event.target.value)
    // this.props.onSearch(event.target.value)
    if (this.refs.searchTerm.value) {
      this.props.onSearch(this.refs.searchTerm.value)
    }
  }

  render() {
    const { error } = this.props
    return (
      <form className="note-add-form">
        <fieldset>
          <label>Search term:</label>
          <input type="text" ref="searchTerm" id="field_searchTerm" onKeyUp={this.onKeyUp.bind(this)} placeholder="Enter Artist, Track or Collection name" />
          {error && <p className="error">{error}</p>}
        </fieldset>
      </form>
    )
  }
}

export default TunesSearch
