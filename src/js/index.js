// Dependency of isomorphic-fetch which is used in actions.js
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

ReactDOM.render (
  <App />,
  document.getElementById('root')
)
