import React from 'react'
import ReactDOM from 'react-dom'

import('./App.jsx').then(({App}) => {
  ReactDOM.render(<App/>, document.querySelector('#app'))
})
