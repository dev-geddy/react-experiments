import React, { Component } from 'react'
import tunesStub from '../../sample-data/tunes.json'
// data resource query samples:
// https://itunes.apple.com/search?term=jean+michel+jarre&entity=music&limit=10
// https://itunes.apple.com/search?term=jean+michel+jarre&entity=musicTrack,musicArtist,song,mix&limit=10
import TunesList from './TunesList'
import TunesSearch from './TunesSearch'
import Request from '../../helpers/Request'
import _findIndex from 'lodash/findIndex'

export class FavouriteTunes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedTune: {},
      favourites: [],
      tunes: []
    }
  }

  componentWillMount() {
    this.setState({
      tunes: tunesStub.results,
      favourites: this.getStoredFavourites()
    })
  }

  componentDidMount() {
    const newTitle = 'iTunes search and favourite'
    if (document.title !== newTitle) {
      document.title = newTitle;
    }
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
    console.log(tune)
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
    Request.callEndpoint({
      method: 'GET',
      url: 'https://itunes.apple.com/search?term=' + term + 'e&entity=musicTrack,musicArtist,song,mix&limit=10'
    }).then((res)=> {
      console.log("iTunes response: ", res)
      this.handleSearchResult(res, term)
    }).catch((e) => {
      throw e
    })
  }

  handleSearchResult(res, term) {
    this.setState({
      tunes: res.results
    })
    /*if (term === this.refs.searchInput.value) {

    }*/
  }

  render() {
    const {
      tunes,
      favourites,
      selectedTune
      } = this.state

    return (
      <article className="page">
        <header>
          <h2>Build my Favourites</h2>
          <p>Search iTune store and pick your favourites!</p>
        </header>
        <div className="page-content contains-columns">
          <div className="row">
            <div className="column large-6 medium-6 small-12">
              <h2>iTunes search</h2>
              <TunesSearch onSubmit={this.queryItunesStore.bind(this)} />
              <TunesList tunes={tunes}
                         onSelect={this.onTuneSelect.bind(this)}
                         selectedTune={selectedTune}
                         buttonCaption="Add to Favourites"
                         buttonIcon="star"
              />
            </div>
            <div className="column large-6 medium-6 small-12">
              <h2>My Favourites</h2>
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
