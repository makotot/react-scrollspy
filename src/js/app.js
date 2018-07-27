import React from 'react'
import Scrollspy from './lib/Scrollspy.jsx'
import Highlight from 'react-highlight'

export default class App extends React.Component {

  render () {
    const style = {
      minHeight: '600px',
    }

    const version = require('../../package.json').version

    return (
      <div className="o-wrapper">

        <div className="o-sidebar o-sidebar--fixed-left c-side-nav">
          <div className="c-side-nav__head">
            <h2 className="c-side-nav__heading c-heading-4 c-heading-4--upper u-font-italic">react<br />scrollspy</h2>
          </div>
          <nav className="c-side-nav__body">
            <Scrollspy
              items={ ['section-1', 'section-2', 'section-3'] }
              currentClassName="is-current"
              className="c-side-nav__list nav-list"
              style={ {fontWeight: 300} }
              offset={ -20 }
              onUpdate={
                (el) => {
                  console.log(el)
                }
              }
            >
              <li className="c-side-nav__item"><a href="#section-1" className="c-side-nav__link">Getting Started</a></li>
              <li className="c-side-nav__item"><a href="#section-2" className="c-side-nav__link">Example</a></li>
              <li className="c-side-nav__item"><a href="#section-3" className="c-side-nav__link">Props</a></li>
            </Scrollspy>
          </nav>
        </div>

        <div className="o-main o-main--with-sidebar o-main--fixed-left-sidebar">
          <div className="container">
            <section style={ style }>
              <div className="o-hero u-align-left">
                <h1 className="c-heading-4 c-heading-4--upper headline">React Scrollspy</h1>
                <ul className="o-inline-list">
                  <li className="o-inline-list__item">
                    <span className="o-hero__sub-heading c-lead">Scrollspy Component</span>
                  </li>
                  <li className="o-inline-list__item">
                    <span className="c-tag">v{ version }</span>
                  </li>
                </ul>
              </div>
            </section>
            <section className="o-content" style={ style } id="section-1">
              <div className="o-content__inner">
                <div className="o-content__inner-head">
                  <h2 className="c-heading-4 c-heading-4--upper">Getting Started</h2>
                </div>
                <div className="o-content__inner-body">
                  <p className="c-paragraph">Install it from <a href="https://www.npmjs.com/package/react-scrollspy" className="c-link">npm</a>.</p>
                  <pre className="c-code">
                    <Highlight className="c-code__inner">{'$ npm install react-scrollspy'}</Highlight>
                  </pre>
                  <p className="c-paragraph">Then, import this library in your JS.</p>
                  <pre className="c-code">
                    <Highlight className="c-code__inner">{'import Scrollspy from \'react-scrollspy\''}</Highlight>
                  </pre>
                </div>
              </div>
            </section>
            <section style={ style } id="section-2">
              <div className="o-content__inner">
                <div className="o-content__inner-head">
                  <h3 className="c-heading-4 c-heading-4--upper">Example</h3>
                </div>
                <div className="o-content__inner-body">
                  <pre className="c-code u-background-opposite">
                    <Highlight className="c-code__inner">
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
            <section style={ style } id="section-3">
              <div className="o-content__inner">
                <div className="o-content__inner-head">
                  <h3 className="c-heading-4 c-heading-4--upper">Props</h3>
                </div>
                <div className="o-content__inner-body">
                  <table className="c-table">
                    <thead>
                      <tr>
                        <th className="c-table__head">Props</th>
                        <th className="c-table__head">Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="c-table__data">items</td>
                        <td className="c-table__data">Id list of target contents.</td>
                      </tr>
                      <tr>
                        <td className="c-table__data">currentClassName</td>
                        <td className="c-table__data">Class name that apply to the navigation element paired with the content element in viewport.</td>
                      </tr>
                      <tr>
                        <td className="c-table__data">scrolledPastClassName</td>
                        <td className="c-table__data">Class name that apply to the navigation elements that have been scrolled past [optional].</td>
                      </tr>
                      <tr>
                        <td className="c-table__data">componentTag</td>
                        <td className="c-table__data">HTML tag for Scrollspy component if you want to use other than <code>{'<ul/>'}</code> [optional].</td>
                      </tr>
                      <tr>
                        <td className="c-table__data">style</td>
                        <td className="c-table__data">Style attribute to be passed to the generated <code>{'<ul/>'}</code> element [optional].</td>
                      </tr>
                      <tr>
                        <td className="c-table__data">offset</td>
                        <td className="c-table__data">Offset value that adjusts to determine the elements are in the viewport [optional].</td>
                      </tr>
                      <tr>
                        <td className="c-table__data">rootEl</td>
                        <td className="c-table__data">Name of the element of scrollable container that can be used with <code>{'querySelector'}</code> [optional].</td>
                      </tr>
                      <tr>
                        <td className="c-table__data">onUpdate</td>
                        <td className="c-table__data">Function to be executed when the active item has been updated [optional].</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
          <footer className="o-footer c-footer">
            <div>Licenced under MIT</div>
          </footer>
        </div>
      </div>
    )
  }
}