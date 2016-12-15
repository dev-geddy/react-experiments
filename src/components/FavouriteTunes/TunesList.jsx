import React, {Component} from 'react'

export class TunesList extends Component {

  static propTypes = {
    tunes: React.PropTypes.array,
    selectedTune: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    buttonCaption: React.PropTypes.string,
    buttonIcon: React.PropTypes.string
  }

  onTuneSelect(index, e) {
    e.preventDefault()
    this.props.onSelect(index)
  }

  renderTune(tune, index) {
    tune = this.formatTune(tune)
    return (
      <article key={tune.uniqueId} className="tunes-list__tune">
        {tune.thumbnail && <img src={tune.thumbnail} alt={tune.recordName} />}
        <p>{tune.itemType}: {tune.authorName} - {tune.recordName}<br />
          <a href="#" onClick={this.onTuneSelect.bind(this, index)}>
            <i className="material-icons">{this.props.buttonIcon}</i> {this.props.buttonCaption}
          </a>
        </p>
        <footer><strong>{tune.genereName}</strong> <em>{tune.released}</em></footer>
      </article>
    )
  }

  formatTune(tune) {
    let tuneTypes = {
      track: {
        uniqueId: tune.wrapperType + tune.trackId,
        thumbnail: tune.artworkUrl100,
        itemType: tune.kind,
        genereName: tune.primaryGenreName,
        authorName: tune.artistName,
        recordName: tune.trackName,
        released: tune.releaseDate
      },
      collection: {
        uniqueId: tune.wrapperType + tune.collectionId,
        thumbnail: tune.artworkUrl100,
        itemType: tune.collectionType,
        genereName: tune.primaryGenreName,
        authorName: tune.artistName,
        recordName: tune.collectionName,
        released: tune.releaseDate
      },
      artist: {
        uniqueId: tune.wrapperType + tune.artistId,
        thumbnail: '',
        itemType: tune.artistType,
        genereName: tune.primaryGenreName,
        authorName: tune.artistName,
        recordName: tune.primaryGenreName,
        released: ''
      }
    }
    return tuneTypes[tune.wrapperType]
  }

  renderTunes(tunes) {
    return tunes.map((tune, index) => {
      return this.renderTune(tune, index)
    })
  }

  render() {
    const {
      tunes
      } = this.props
    return (
      <section className="tunes-list">
        {this.renderTunes(tunes)}
      </section>
    )
  }
}

export default TunesList
