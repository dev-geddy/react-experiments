import React, { Component } from 'react'
import { locationActions } from './modules/location'
import { connect } from 'react-redux'
import GoogleMap from './GoogleMap'

export class TravelViaLocations extends Component {

  static PropTypes = {
    searchResults: React.PropTypes.array,
    isLoading: React.PropTypes.bool,
    lookupLocation: React.PropTypes.func
  }

  componentDidMount() {
    this.props.loadStoredWaypoints()
  }

  componentWillUnmount() {
    this.props.storeWaypoints()
  }

  handleOnAdd(waypoint, e) {
    e.preventDefault()
    const { waypoints } = this.props
    if (waypoints.length < 10) {
      this.props.addWayPoint(waypoint)
    }
  }

  handleOnRemove(index, waypoint, e) {
    e.preventDefault()
    this.props.removeWayPoint(index, waypoint)
  }

  handleOnChange(e) {
    const inputId = e.target.id
    const inputValue = e.target.value
    switch (inputId) {
      case "locationSearchInput":
        this.props.lookupLocation(inputValue)
        break
      default:
        break
    }
  }

  onNewRoute(route, e) {
    if (route && route.legs) {
      this.props.appendWaypointsInformation(route.legs)
    }
  }

  renderResults(locations) {
    return locations.map((location, index)=> {
      return (
        <div key={index} className="travel-way-point">
          {location.formatted_address}
          <a href="#" className="add-remove-button" onClick={this.handleOnAdd.bind(this, location)}><i className="material-icons">add_box</i></a>
        </div>
      )
    })
  }

  renderWaypoints(locations) {
    return locations.map((location, index)=> {
      return (
        <div key={index} className="travel-way-point">
          {location.formatted_address}<br />
          {location.leg && <small>{location.leg.distance.text}, <strong>{location.leg.duration.text}</strong></small>}
          {location.geometry && <small className="small-coordinates"> ({location.geometry.location.lat}, {location.geometry.location.lng})</small>}
          <a href="#" className="add-remove-button" onClick={this.handleOnRemove.bind(this, location, index)}><i className="material-icons">clear</i></a>
        </div>
      )
    })
  }

  render() {
    const {
      searchResults,
      queryString,
      waypoints
      } = this.props

    return (
      <article className="page">
        <header>
          <h2>Travel via location</h2>
          <p>Up to 4 locations to plan a journey</p>
        </header>
        <div className="page-content contains-columns">
          <div className="row">
            <div className="column large-4 medium-6 small-12">
              <h3>Search</h3>
              <p>You can search and add waypoints.</p>
              <input type="text"
                     onChange={this.handleOnChange.bind(this)}
                     value={queryString}
                     id="locationSearchInput"
                     placeholder="Location search"/>
              {queryString && <h3>Search: {queryString}</h3>}
              {searchResults.length > 0 && this.renderResults(searchResults)}
              <hr />
              <h3>Waypoints added</h3>
              {waypoints ? this.renderWaypoints(waypoints) : 'No waypoints yet.'}
            </div>
            <div className="column large-8 medium-6 small-12">

              <div style={{height: 500}}>
                <GoogleMap waypoints={waypoints} onNewRoute={this.onNewRoute.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export const mapStateToProps = (reduxState) => ({
  searchResults: reduxState.locationReducer.searchResults,
  waypoints: reduxState.locationReducer.waypoints,
  isLoading: reduxState.locationReducer.isLoading,
  queryString: reduxState.locationReducer.queryString
})

export const mapActionsToProps = {
  loadStoredWaypoints: locationActions.loadStoredWaypoints,
  lookupLocation: locationActions.lookupLocation,
  storeWaypoints: locationActions.storeWaypoints,
  addWayPoint: locationActions.addWayPoint,
  removeWayPoint: locationActions.removeWayPoint,
  appendWaypointsInformation: locationActions.appendWaypointsInformation
}

export default connect(mapStateToProps, mapActionsToProps)(TravelViaLocations)