import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

import 'style-loader!css-loader!postcss-loader!sass-loader!../scss/app.scss'

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('js-app')
)

if (module.hot) {
  module.hot.accept('./app', () => {
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>,
       document.getElementById('js-app')
    )
  })
}