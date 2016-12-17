/* global google */
import React, { Component } from "react"

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps/lib'

const google = window.google

const DirectionsGoogleMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={7} defaultCenter={props.center}>
    {props.directions && <DirectionsRenderer directions={props.directions}/>}
  </GoogleMap>
))

export class GoogleMapComponent extends Component {

  static propTypes = {
    onNewRoute: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      origin: this.createLatLngFromCoordinates(52.927842, -4.133384), // initial location
      destination: null,
      directions: null
    }
  }

  componentDidMount() {
    const { waypoints } = this.props
    this.drawMap(this.createRouteConfig(waypoints))
  }

  createLatLngFromCoordinates(lat, lng) {
    return new google.maps.LatLng(lat, lng)
  }

  createLatLng(waypoint) {
    return new google.maps.LatLng(waypoint.geometry.location.lat, waypoint.geometry.location.lng)
  }

  createRouteConfig(waypoints) {
    const lastIndex = waypoints.length - 1
    const waypointsLength = waypoints.length
    const originLatLng = waypointsLength > 0 ? this.createLatLng(waypoints[0]) : null
    const destinationLatLng = waypointsLength > 0 ? this.createLatLng(waypoints[lastIndex]) : null
    const midPoints = waypoints.length > 2 ? this.buildMidPoints(waypoints.slice(1, -1)) : []

    const routeConfig = {
      origin: originLatLng,
      destination: destinationLatLng,
      waypoints: midPoints,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: 'pessimistic'
      }
    }

    return routeConfig
  }

  componentWillReceiveProps(nextProps) {
    const nextWaypoints = nextProps.waypoints
    const prevWaypoints = this.props.waypoints
    if (nextWaypoints.length !== prevWaypoints.length) {
      this.drawMap(this.createRouteConfig(nextWaypoints))
    }
  }

  buildMidPoints(waypoints) {
    return waypoints.map((waypoint)=> {
      return {
        location: waypoint.formatted_address,
        stopover: true
      }
    })
  }

  drawMap(routeConfig) {
    if (!routeConfig.origin || !routeConfig.destination) return

    const DirectionsService = new google.maps.DirectionsService()

    DirectionsService.route(routeConfig, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
          origin: routeConfig.origin,
          destination: routeConfig.destination
        })
        this.props.onNewRoute(result.routes.length ? result.routes[0] : null)
      } else {
        if (result !== null) console.error('error fetching directions', result)
      }
    })
  }

  render() {
    return (
      <DirectionsGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.origin}
        directions={this.state.directions}
      />
    )
  }
}

export default GoogleMapComponent