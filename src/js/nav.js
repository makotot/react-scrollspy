import React from 'react'
import Scrollspy from './lib/scrollspy'

const Nav = () => (
  <nav className="nav">
    <div className="nav__item nav__item--inverse">
      <a href="/" className="nav__link nav__title">React Scrollspy</a>
    </div>
    <Scrollspy
      items={ ['section-1', 'section-2', 'section-3'] }
      currentClassName="nav__item--active"
      className="nav__inner"
      style={{
        fontWeight: 300
      }}
      offset={ -50 }
      onUpdate={
        (el) => {
          console.log(el)
        }
      }
    >
      <li className="nav__item"><a href="#section-1" className="nav__link">Getting Started</a></li>
      <li className="nav__item"><a href="#section-2" className="nav__link">Example</a></li>
      <li className="nav__item"><a href="#section-3" className="nav__link">Props</a></li>
    </Scrollspy>
  </nav>
)

export default Nav