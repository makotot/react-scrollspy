import test from 'ava'
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { renderJSX, JSX } from 'jsx-test-helpers'
import { Scrollspy } from '../src/js/lib/Scrollspy'
import './document'

test('renders correct children length', (t) => {
  const wrapper = shallow(
    <Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current">
      <li className=""><a href="#section-1">section 1</a></li>
      <li className=""><a href="#section-2">section 2</a></li>
      <li className=""><a href="#section-3">section 3</a></li>
    </Scrollspy>
  )
  t.is(wrapper.find('li').length, 3)
})

test('renders children with correct props', (t) => {
  const wrapper = shallow(
    <Scrollspy items={ ['section-1'] } currentClassName="is-current">
      <li className="" randomProp="someText"><a href="#section-1">section 1</a></li>
    </Scrollspy>
  )
  t.is(wrapper.find('li').prop('randomProp'), 'someText')
})
test('should update targetItems after receiving new props', (t) => {
  const wrapper = mount(
    <Scrollspy items={ [] } />
  )

  t.is(wrapper.state('targetItems').length, 0)

  wrapper.setProps({ items: [ 'section-1', 'section-2', 'section-3' ] })

  t.is(wrapper.state('targetItems').length, 3)
})
