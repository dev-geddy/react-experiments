import Axios from 'axios'

const GMapsApiKey = 'AIzaSyBmasL_DeaeDvK_1Z-UkHdvlNPhMtD6rjQ'
// const GMapsApiKey2 = 'AIzaSyCMQswXDykLVEsGLT8DnZTA-j7aL5mpgnE'

export const fetchLocations = (searchTerm) => {
  const requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchTerm + '&key=' + GMapsApiKey

  return Axios.get(requestUrl)
}

export const calculateRoute = (waypointsAll) => {
  console.log("waypointsAll: ", waypointsAll)

  let waypoints = waypointsAll.map((waypoint)=>{
    return waypoint.formatted_address
  })

  let middleWaypoints = []

  if (waypoints.length > 2) {
    middleWaypoints = waypoints.slice(1, waypoints.length - 1)
  } else {
    middleWaypoints = []
  }

  let routeMidWaypoints = []

  for (let i = 0; i < middleWaypoints.length; i++) {
    routeMidWaypoints.push(middleWaypoints[i])
  }

  const routeOrigin = waypoints[0]
  const routeDestination = waypoints[waypoints.lenth - 1]
  const routeWaypoints = routeMidWaypoints ? routeMidWaypoints.join('|') : ''

  const requestUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${routeOrigin}&destination=${routeDestination}&waypoints=${routeWaypoints}&key=${GMapsApiKey}`
  return Axios.get(requestUrl)
}

export const locationService = (store) => {
  // const dispatch = store.dispatch
  return {
    fetchLocations,
    calculateRoute
  }
}



export default locationService