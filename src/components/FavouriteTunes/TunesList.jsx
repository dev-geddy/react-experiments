import React, {Component} from 'react'

export class TunesList extends Component {

  static propTypes = {
    tunes: React.PropTypes.array,
    selectedTune: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    buttonCaption: React.PropTypes.string,
    buttonIcon: React.PropTypes.string,
    favouritedUniqueIds: React.PropTypes.array
  }

  onTuneSelect(index, e) {
    e.preventDefault()
    this.props.onSelect(index)
  }

  renderTune(tune, index) {
    tune = this.formatTune(tune)
    let isFavourited = false
    let { favouritedUniqueIds } = this.props
    if (favouritedUniqueIds && favouritedUniqueIds.length > 0) {
      isFavourited = (favouritedUniqueIds.indexOf(tune.uniqueId) === -1) ? false : true
    }

    return (
      <article key={tune.uniqueId} className="tunes-list__tune">
        <div className="row collapse">
          <div className="column tune-thumbnail">
            {tune.thumbnail ? <img src={tune.thumbnail} alt={tune.recordName} /> : <div className="no-img-placeholder"></div>}
          </div>
          <div className="column tune-description">
            <p>{tune.authorName} - {tune.recordName}<br />
              {!isFavourited ?
                <a href="#" className="fav-button" onClick={this.onTuneSelect.bind(this, index)}>
                  <i className="material-icons">{this.props.buttonIcon}</i> {this.props.buttonCaption}
                </a> : <span className="fav-button fav-already"><i className="material-icons">{this.props.buttonIcon}</i> Already in the list</span>
              }

            </p>
          </div>
        </div>
        <footer><strong>{tune.genereName}</strong>: <em>{tune.itemType}</em></footer>
      </article>
    )
  }

  formatTune(tune) {
    switch (tune.wrapperType) {
      case "track":
        return {
          uniqueId: tune.wrapperType + tune.trackId,
          thumbnail: tune.artworkUrl100,
          itemType: tune.kind,
          genereName: tune.primaryGenreName,
          authorName: tune.artistName,
          recordName: tune.trackName,
          released: tune.releaseDate
        }
      case "collection":
        return {
          uniqueId: tune.wrapperType + tune.collectionId,
          thumbnail: tune.artworkUrl100,
          itemType: tune.collectionType,
          genereName: tune.primaryGenreName,
          authorName: tune.artistName,
          recordName: tune.collectionName,
          released: tune.releaseDate
        }
      case "artist":
        return {
          uniqueId: tune.wrapperType + tune.artistId,
          thumbnail: '',
          itemType: tune.artistType,
          genereName: tune.primaryGenreName,
          authorName: tune.artistName,
          recordName: tune.primaryGenreName,
          released: ''
        }
      default:
        return {
          uniqueId: '',
          thumbnail: '',
          itemType: '',
          genereName: '',
          authorName: '',
          recordName: 'Unsupported wrapper type: ' + tune.wrapperType,
          released: ''
        }
    }
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
