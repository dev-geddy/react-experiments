import rootReducer from './rootReducer'
import locationService from '../services/locationService'
import { routerMiddleware } from 'react-router-redux'
import locationMiddleware from '../middleware/locationMiddleware'

// import { applyMiddleware, compose, createStore } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

// dev tools
// import DevTools from '../devtools/DevTools'

export const configureStore = (initialState = {}, history) => {
  let apiServices = {}
  let middleware = applyMiddleware(
    thunk.withExtraArgument(apiServices),
    locationMiddleware,
    routerMiddleware(history)
  )
  const store = middleware(createStore)(rootReducer, initialState)

  apiServices.locationService = locationService.apply(this, [store])

  return store
}

/*export const configureStoreWithDevTools = (initialState = {}, history) => {
  let apiServices = {}
  let middleware = applyMiddleware(
    thunk.withExtraArgument(apiServices),
    locationMiddleware,
    routerMiddleware(history)
  )

  const devTools = window.devToolsExtension ? window.devToolsExtension() : DevTools.default.instrument()

  middleware = compose(middleware, devTools)

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }

  apiServices.locationService = locationService.apply(this, [store])

  return store
}*/

// export default configureStoreWithDevTools
export default configureStore
