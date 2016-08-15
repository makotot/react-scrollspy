import React from 'react'
import ReactDOM from 'react-dom'
import { Scrollspy } from './lib/Scrollspy.jsx'

const App = React.createClass({

  render () {

    const style = {
      height: '900px',
    }

    const nestedStyle = {
      height: '300px',
      padding: '0 20px',
    }

    return (
      <div>

        <div>
          <section style={ style } id="section-1">section 1</section>
          <section style={ style } id="section-2">section 2</section>
          <section style={ style } id="section-3">
            <div style={ nestedStyle } id="nested-1">
              section 3 / nested 1
            </div>
            <div style={ nestedStyle } id="nested-2">
              section 3 / nested 2
            </div>
            <div style={ nestedStyle } id="nested-3">
              section 3 / nested 3
            </div>
          </section>
        </div>

        <div className="nav-list-wrapper">
          <nav>
            <Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current" className="nav-list" style={ {backgroundColor: '#ccc'} }>
              <li><a href="#section-1">section 1</a></li>
              <li><a href="#section-2">section 2</a></li>
              <li>
                <a href="#section-3">section 3</a>
                <nav>
                  <Scrollspy items={ ['nested-1', 'nested-2', 'nested-3'] } currentClassName="is-current">
                    <li><a href="#nested-1">nested 1</a></li>
                    <li><a href="#nested-2">nested 2</a></li>
                    <li><a href="#nested-3">nested 3</a></li>
                  </Scrollspy>
                </nav>
              </li>
            </Scrollspy>
          </nav>
        </div>

      </div>
    )
  }
})


ReactDOM.render(<App />, document.getElementById('js-app'))
