import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import locationReducer from './../components/TravelViaLocations/modules/location'

export default combineReducers({
  routerReducer,
  locationReducer
})
