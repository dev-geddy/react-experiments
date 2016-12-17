import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// views components
import App from './App'
import Home from './components/Home'
import Notes from './components/ClientNotes'
import Tunes from './components/FavouriteTunes'
import Locations from './components/TravelViaLocations'
import NotFound from './components/NotFound'

// import makeRoutes from './routes'
import configureStore from './redux/configureStore'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.routerReducer
})

const pageTitleSuffix = ' | G86'
const pageTitles = {
  '/': 'React Experiments',
  '/notes': Notes.pageTitle,
  '/tunes': Tunes.pageTitle,
  '/locations': Locations.pageTitle
}

browserHistory.listen((location) => {
  const newTitle = pageTitles[location.pathname] || 'Not found...'
  document.title = newTitle + pageTitleSuffix
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="notes" component={Notes}/>
        <Route path="tunes" component={Tunes}/>
        <Route path="locations" component={Locations}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)