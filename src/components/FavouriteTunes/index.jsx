import React, { Component } from 'react'
import tunesStub from '../../sample-data/tunes.json'
// data resource query samples:
// https://itunes.apple.com/search?term=jean+michel+jarre&entity=music&limit=10
// https://itunes.apple.com/search?term=jean+michel+jarre&entity=musicTrack,musicArtist,song,mix&limit=10
import TunesList from './TunesList'
import TunesSearch from './TunesSearch'
// import Request from '../../helpers/Request'
import _findIndex from 'lodash/findIndex'

export class FavouriteTunes extends Component {
  static pageTitle = 'Favourite tunes'

  constructor(props) {
    super(props)

    this.state = {
      selectedTune: {},
      favourites: [],
      tunes: [],
      error: ''
    }

  }

  componentWillMount() {
    this.setState({
      tunes: tunesStub.results,
      favourites: this.getStoredFavourites()
    })
  }

  hasStoredData() {
    return localStorage.getItem('favouriteTunes') ? true : false
  }

  storeNewData(newData) {
    localStorage.setItem('favouriteTunes', JSON.stringify(newData))
  }

  getStoredData() {
    return JSON.parse(localStorage.getItem('favouriteTunes'))
  }

  getStoredFavourites() {
    if (this.hasStoredData()) {
      return this.getStoredData()
    }
    return []
  }

  isTuneInFavourites(tune) {
    const searchResult = _findIndex(this.state.favourites, (favourite) => {
      // according to item types we query
      let uniqueId = tune.wrapperType + (tune.trackId || tune.collectionId || tune.artistId)
      let favouriteUniqueId = favourite.wrapperType + (favourite.trackId || favourite.collectionId || favourite.artistId)
      return favouriteUniqueId === uniqueId
    })
    return searchResult !== -1 ? true : false
  }

  onTuneSelect(index) {
    // add only new tunes, which haven't been added before
    if (!this.isTuneInFavourites(this.state.tunes[index])) {
      let favourites = this.state.favourites
      favourites.unshift(this.state.tunes[index])
      this.setState({favourites})
      this.storeNewData(favourites)
    }
  }

  onTuneDelete(index) {
    let favourites = this.state.favourites
    favourites.splice(index, 1)
    this.setState({favourites})
    this.storeNewData(favourites)
  }

  queryItunesStore(term) {
    // don't do any calls.
    this.setState({error: 'If the real direct call to API would happen, it would return: No "Access-Control-Allow-Origin" header is present on the requested resource.'})
    /*Request.callEndpoint({
      method: 'GET',
      url: 'https://itunes.apple.com/search?term=' + term + 'e&entity=musicTrack,musicArtist,song,mix&limit=10'
    }).then((res)=> {
      console.log("iTunes response: ", res)
      this.handleSearchResult(res, term)
    }, (e) => {
      this.setState({error: e.message + '. Most likely: No "Access-Control-Allow-Origin" header is present on the requested resource.'})
    }).catch((e) => {
      this.setState({error: e.message})
    })*/
  }

  handleSearchResult(res, term) {
    this.setState({
      tunes: res.results
    })
  }

  buildArrayOfUniqueIds(favourites) {
    return favourites.reduce((previousUniqueIds, favourite) => {
      previousUniqueIds.push(this.formatTuneId(favourite))
      return previousUniqueIds
    }, [])
  }

  formatTuneId(tune) {
    switch (tune.wrapperType) {
      case "track":
        return (tune.wrapperType + tune.trackId)
      case "collection":
        return (tune.wrapperType + tune.collectionId)
      case "artist":
        return (tune.wrapperType + tune.artistId)
      default:
        return 'Unsupported wrapper: ' + tune.wrapperType
    }
  }

  render() {
    const {
      tunes,
      favourites,
      selectedTune,
      error
      } = this.state

    const favouritedUniqueIds = this.buildArrayOfUniqueIds(favourites)

    return (
      <article className="page">
        <header>
          <h2>{FavouriteTunes.pageTitle}</h2>
          <p>Search iTune store and pick your favourites! <strong>Based on mocked response.</strong></p>
        </header>
        <div className="page-content contains-columns">
          <div className="row">
            <div className="column large-6 medium-6 small-12">
              <h3>iTunes search</h3>
              <TunesSearch onSearch={this.queryItunesStore.bind(this)}
                           error={error}
              />
              <TunesList tunes={tunes}
                         onSelect={this.onTuneSelect.bind(this)}
                         selectedTune={selectedTune}
                         favouritedUniqueIds={favouritedUniqueIds}
                         buttonCaption="Favourite"
                         buttonIcon="star"
              />
            </div>
            <div className="column large-6 medium-6 small-12">
              <h3>My Favourites</h3>
              <TunesList tunes={favourites}
                         onSelect={this.onTuneDelete.bind(this)}
                         selectedTune={selectedTune}
                         buttonCaption="Unfavourite..."
                         buttonIcon="delete"
              />
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default FavouriteTunes
