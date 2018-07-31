import React from 'react'
import Scrollspy from './lib/scrollspy'
import Highlight from 'react-highlight'

import { version } from '../../package.json'
const style = {
  minHeight: '600px',
}

export default class App extends React.Component {

  render () {
    return (
      <div>

        <div>
          <div>
            <h2>react scrollspy</h2>
          </div>
          <nav>
            <Scrollspy
              items={ ['section-1', 'section-2', 'section-3'] }
              style={ {fontWeight: 300} }
              offset={ -20 }
              onUpdate={
                (el) => {
                  console.log(el)
                }
              }
            >
              {
                ({ inViewState, isScrolledPast, isCurrentNavId }) => {
                  return (
                    <ul>
                      <li className={ ` ${ isCurrentNavId('section-1') && 'is-current' }` }>
                        <a href="#section-1">Getting Started</a>
                      </li>
                      <li className={ ` ${ isCurrentNavId('section-2') && 'is-current' }` }>
                        <a href="#section-2">Example</a>
                      </li>
                      <li className={ ` ${ isCurrentNavId('section-3') && 'is-current' }` }>
                        <a href="#section-3">Props</a>
                      </li>
                    </ul>
                  )
                }
              }
            </Scrollspy>
          </nav>
        </div>

        <div>
          <div>
            <section style={ style }>
              <div>
                <h1>React Scrollspy</h1>
                <ul>
                  <li>
                    <span>Scrollspy Component</span>
                  </li>
                  <li>
                    <span>v{ version }</span>
                  </li>
                </ul>
              </div>
            </section>
            <section style={ style } id="section-1">
              <div>
                <div>
                  <h2>Getting Started</h2>
                </div>
                <div>
                  <p>Install it from <a href="https://www.npmjs.com/package/react-scrollspy">npm</a>.</p>
                  <pre>
                    <Highlight>{'$ npm install react-scrollspy'}</Highlight>
                  </pre>
                  <p>Then, import this library in your JS.</p>
                  <pre>
                    <Highlight>{'import Scrollspy from \'react-scrollspy\''}</Highlight>
                  </pre>
                </div>
              </div>
            </section>
            <section style={ style } id="section-2">
              <div>
                <div>
                  <h3>Example</h3>
                </div>
                <div>
                  <pre>
                    <Highlight>
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
              <div>
                <div>
                  <h3>Props</h3>
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Props</th>
                        <th>Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>items</td>
                        <td>Id list of target contents.</td>
                      </tr>
                      <tr>
                        <td>currentClassName</td>
                        <td>Class name that apply to the navigation element paired with the content element in viewport.</td>
                      </tr>
                      <tr>
                        <td>scrolledPastClassName</td>
                        <td>Class name that apply to the navigation elements that have been scrolled past [optional].</td>
                      </tr>
                      <tr>
                        <td>componentTag</td>
                        <td>HTML tag for Scrollspy component if you want to use other than <code>{'<ul/>'}</code> [optional].</td>
                      </tr>
                      <tr>
                        <td>style</td>
                        <td>Style attribute to be passed to the generated <code>{'<ul/>'}</code> element [optional].</td>
                      </tr>
                      <tr>
                        <td>offset</td>
                        <td>Offset value that adjusts to determine the elements are in the viewport [optional].</td>
                      </tr>
                      <tr>
                        <td>rootEl</td>
                        <td>Name of the element of scrollable container that can be used with <code>{'querySelector'}</code> [optional].</td>
                      </tr>
                      <tr>
                        <td>onUpdate</td>
                        <td>Function to be executed when the active item has been updated [optional].</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
          <footer>
            <div>Licenced under MIT</div>
          </footer>
        </div>
      </div>
    )
  }
}