const LOCATION_REQUESTED = 'Locations have been requested'
const LOCATION_REQUEST_SUCCESS = 'Locations have been fetched'
const LOCATION_REQUEST_FAILED = 'Location fetch failed'
const ADD_WAY_POINT = 'Add new waypoint'
const REMOVE_WAY_POINT = 'Remove waypoint'
const LOAD_STORED_WAYPOINTS = 'Load waypoints from local storage'
const STORE_WAYPOINTS = 'Save waypoints to local storage'
const UPDATE_WAYPOINTS_INFO = 'Append timing data to waypoints'

export const loadStoredWaypoints = () => {
  const storedData = localStorage.getItem('storedWaypoints')
  const storedWaypoints = storedData ? JSON.parse(storedData) : []
  return (dispatch) => {
    dispatch({type: LOAD_STORED_WAYPOINTS, waypoints: storedWaypoints})
  }
}
export const storeWaypoints = () => {
  return (dispatch, getState, apiServices) => {
    console.log("getState().waypoints: ", getState().locationReducer.waypoints)
    const waypointsToStore = getState().locationReducer.waypoints || []
    localStorage.setItem('storedWaypoints', JSON.stringify(waypointsToStore))

    dispatch({type: STORE_WAYPOINTS})
  }
}

export const lookupLocation = (queryString) => {
  return (dispatch, getState, apiServices) => {
    dispatch({type: LOCATION_REQUESTED, queryString: queryString})

    return apiServices.locationService.fetchLocations(queryString).then((res) => {
      console.log("locations results: ", res.data.results)
      dispatch({type: LOCATION_REQUEST_SUCCESS, searchResults: res.data.results})}
    )
  }
}

export const addWayPoint = (waypoint) => {
  return (dispatch, getState, apiService) => {
    dispatch({type: ADD_WAY_POINT, waypoint: waypoint})
    dispatch(storeWaypoints())
  }
}

export const removeWayPoint = (waypoint, index) => {
  return (dispatch, getState, apiService) => {
    dispatch({type: REMOVE_WAY_POINT, waypoint: waypoint, waypointIndex: index})
    dispatch(storeWaypoints())
  }
}

export const appendWaypointsInformation = (legs) => {
  return (dispatch, getState, apiServices) => {
    const waypoints = getState().locationReducer.waypoints
    const routeStartLeg = {
      distance: { text: 'Origin'},
      duration: { text: 'Leaving now'}
    }
    const updatedWaypoints = waypoints.map((waypoint, index)=>{
      const legIndex = index > 0 ? index - 1 : -1
      const legObj = legIndex === -1 ? routeStartLeg : legs[legIndex]
      const updatedWaypoint = {
        ...waypoint,
        leg: legObj
      }
      return updatedWaypoint
    })
    dispatch({type: UPDATE_WAYPOINTS_INFO, updatedWaypoints: updatedWaypoints})
  }
}

export const locationActions = {
  loadStoredWaypoints,
  storeWaypoints,
  lookupLocation,
  addWayPoint,
  removeWayPoint,
  appendWaypointsInformation
}

export const defaultState = {
  isLoading: false,
  searchResults: [],
  waypoints: [],
  queryString: '',
  message: 'Default redux state',
  error: {}
}

export const ACTION_HANDLERS = {
  [LOCATION_REQUESTED]: (state, action) => {
    return {
      ...state,
      isLoading: true,
      queryString: action.queryString,
      error: ''
    }
  },
  [LOCATION_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      searchResults: action.searchResults,
      error: ''
    }
  },
  [LOCATION_REQUEST_FAILED]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      searchResults: [],
      error: action.error
    }
  },
  [ADD_WAY_POINT]: (state, action) => {
    let allWaypoints = state.waypoints.slice() // loose reference
    allWaypoints.push(action.waypoint)
    return {
      ...state,
      waypoints: allWaypoints,
      searchResults: [],
      queryString: ''
    }
  },
  [REMOVE_WAY_POINT]: (state, action) => {
    let newWaypoints = state.waypoints.slice() // loose reference
    newWaypoints.splice(action.waypointIndex, 1)
    return {
      ...state,
      waypoints: newWaypoints
    }
  },
  [STORE_WAYPOINTS]: (state, action) => {
    return {
      ...state
    }
  },
  [LOAD_STORED_WAYPOINTS]: (state, action) => {
    return {
      ...state,
      waypoints: action.waypoints
    }
  },
  [UPDATE_WAYPOINTS_INFO]: (state, action) => {
    return {
      ...state,
      waypoints: action.updatedWaypoints
    }
  }
}

export const locationReducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default locationReducer