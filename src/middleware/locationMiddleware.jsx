export const locationMiddleware = store => next => action => {
  // handle action.type
  return next(action)
}

export default locationMiddleware