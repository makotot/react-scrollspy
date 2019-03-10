import React from 'react'
import ReactDOM from 'react-dom'
import Highlight from 'react-highlight'
import Nav from './nav'
import Footer from './footer'
import PropTable from './props-table'

import '../scss/app.scss'

const version = require('../../package.json').version

class App extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <Nav />
        <main className="main">
          <section className="section">
            <div className="hero">
              <h1 className="title">React Scrollspy</h1>
              <div className="description">
                <span>Scrollspy Component for React</span>
                <span>v { version }</span>
              </div>
              <a href="https://github.com/makotot/react-scrollspy" className="github-link">Github</a>
            </div>
          </section>
          <section className="section" id="section-1">
            <div className="">
              <div className="section-title">
                <h2 className="section-title__inner">Getting Started</h2>
              </div>
              <div className="section-body">
                <p className="">Install it from <a href="https://www.npmjs.com/package/react-scrollspy" className="link">npm</a> or yarn.</p>
                <pre className="code">
                  <Highlight className="">{'$ npm install react-scrollspy'}</Highlight>
                </pre>
                <br />
                <pre className="code">
                  <Highlight className="">{'$ yarn add react-scrollspy'}</Highlight>
                </pre>
                <p className="">Then, import this library in your JS.</p>
                <pre className="code">
                  <Highlight className="">{'import Scrollspy from \'react-scrollspy\''}</Highlight>
                </pre>
              </div>
            </div>
          </section>
          <section className="section" id="section-2">
            <div className="">
              <div className="section-title">
                <h3 className="section-title__inner">Example</h3>
              </div>
              <div className="section-body">
                <pre className="code">
                  <Highlight className="">
{`<div>
<div>
  <section id="section-1">section 1</section>
  <section id="section-2">section 2</section>
  <section id="section-3">section 3</section>
</div>
<Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current">
  <li><a href="#section-1">section 1</a></li>
  <li><a href="#section-2">section 2</a></li>
  <li><a href="#section-3">section 3</a></li>
</Scrollspy>
</div>`}
                  </Highlight>
                </pre>
              </div>
            </div>
          </section>
          <section className="section" id="section-3">
            <div className="">
              <div className="section-title">
                <h3 className="section-title__inner">Props</h3>
              </div>
              <div className="section-body">
                <PropTable />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('js-app'))
