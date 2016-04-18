// Dependency of isomorphic-fetch which is used in actions.js
import 'babel-polyfill'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts } from './actions'
import rootReducer from './reducers'

// import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

// store.dispatch(selectSubreddit('games'))
store.dispatch(fetchPostsIfNeeded('games')).then(() =>
  console.log(store.getState())
)

// ReactDOM.render (
//   <App />,
//   document.getElementById('root')
// )
