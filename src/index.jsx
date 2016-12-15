import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// views components
import App from './App'
import Home from './components/Home'
import Notes from './components/Notes'
import Locations from './components/TravelViaLocations'
import NotFound from './components/NotFound'

// import makeRoutes from './routes'
import configureStore from './redux/configureStore'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.routerReducer
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="notes" component={Notes} />
        <Route path="locations" component={Locations} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)