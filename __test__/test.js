import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Scrollspy from '../src/js/lib/Scrollspy'

describe('Scrollspy', () => {
  it('renders correct children length', () => {
    const wrapper = shallow(
      <Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current">
        <li className=""><a href="#section-1">section 1</a></li>
        <li className=""><a href="#section-2">section 2</a></li>
        <li className=""><a href="#section-3">section 3</a></li>
      </Scrollspy>
    )
    expect(wrapper.find('li').length).toBe(3)
  })

  it('renders children with correct props', () => {
    const wrapper = shallow(
      <Scrollspy items={ ['section-1'] } currentClassName="is-current">
        <li className="" randomProp="someText"><a href="#section-1">section 1</a></li>
      </Scrollspy>
    )
    expect(wrapper.find('li').prop('randomProp')).toBe('someText')
  })

  it('renders expected html tag', () => {
    const defaultTag = shallow(<Scrollspy></Scrollspy>)
    const customTag = shallow(<Scrollspy componentTag={ 'div' }></Scrollspy>)

    expect(defaultTag.type()).toBe('ul')
    expect(customTag.type()).toBe('div')
  })
})

