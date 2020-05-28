import test from 'ava'
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Scrollspy from '../src/js/lib/scrollspy'

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

test('renders component and passed through props', (t) => {
  const MyComponent = () => {}
  const otherProps = { randomProp: 'someText' }
  const wrapper = shallow(<Scrollspy componentTag={ MyComponent } firstProp={1} secondProp { ...otherProps }></Scrollspy>)

  t.is(wrapper.type(), MyComponent)
  t.is(wrapper.prop('firstProp'), 1)
  t.is(wrapper.prop('secondProp'), true)
  t.is(wrapper.prop('randomProp'), 'someText')
})

test('renders expected html tag', (t) => {
  const defaultTag = shallow(<Scrollspy></Scrollspy>)
  const customTag = shallow(<Scrollspy componentTag={ 'div' }></Scrollspy>)

  t.is(defaultTag.type(), 'ul')
  t.is(customTag.type(), 'div')
})

