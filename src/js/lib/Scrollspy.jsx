import React from 'react'

export class Scrollspy extends React.Component {

  static get PropTypes () {
    return {
      items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      currentClassName: React.PropTypes.string.isRequired,
    }
  }

  static get defaultProps () {
    return {
      items: [],
      currentClassName: '',
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      targetItems: [],
      inViewState: [],
    }
    // manually bind as ES6 does not apply this
    // auto binding as React.createClass does
    this._handleSpy = this._handleSpy.bind(this)
  }

  _initSpyTarget (items) {
    const targetItems = items.map((item) => {

      return document.getElementById(item)
    })

    return targetItems
  }

  _getElemsViewState (targets) {
    let elemsInView = []
    let elemsOutView = []
    let viewStatusList = []

    const targetItems = targets ? targets : this.state.targetItems

    let hasInViewAlready = false

    for (let i = 0, max = targetItems.length; i < max; i++) {
      let currentContent = targetItems[i]
      let isInView = hasInViewAlready ? false : this._isInView(currentContent)

      if (isInView) {
        hasInViewAlready = true
        elemsInView.push(currentContent)
      } else {
        elemsOutView.push(currentContent)
      }

      if (this._isAtEnd() &&                // We have reached the end,
          this._isInView(currentContent) && // and the last element is visible,
          !isInView &&                      // but not triggered.          
          i===max-1 &&                      
          (document.documentElement.scrollTop || document.body.scrollTop)>0) { // Only if we have scrolled.
        elemsOutView.pop()                 // Cancel adding this element to elemsOutView.
        elemsOutView.push(...elemsInView)  // Transfer everything from elemsInView to elemsOutView,
        elemsInView = [currentContent]     // and make current element the only elemsInView element.
        viewStatusList.fill(false)         // Make other elements false,
        isInView = true                    // and this element true.
      }

      viewStatusList.push(isInView)
    }

    return {
      inView: elemsInView,
      outView: elemsOutView,
      viewStatusList,
    }
  }

  _isInView (el) {
    const rect = el.getBoundingClientRect()
    const winH = window.innerHeight
    const doc = document
    const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop
    const scrollBottom = scrollTop + winH
    const elTop = rect.top + scrollTop
    const elBottom = elTop + el.offsetHeight

    return (elTop < scrollBottom) && (elBottom > scrollTop)
  }

  _isAtEnd () {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    const scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight
    
    return scrolledToBottom
  }

  _spy (targets) {
    this.setState({
      inViewState: this._getElemsViewState(targets).viewStatusList,
    })
  }

  _handleSpy () {
    let timer

    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(this._spy.bind(this), 100)
  }

  _initFromProps () {
    const targetItems = this._initSpyTarget(this.props.items)

    this.setState({
      targetItems,
    })

    this._spy(targetItems)
  }

  componentDidMount () {
    this._initFromProps()
    window.addEventListener('scroll', this._handleSpy)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._handleSpy)
  }

  componentWillReceiveProps () {
    this._initFromProps()
  }

  render () {
    let counter = 0
    const items = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        className: (child.props.className ? child.props.className : '') + (this.state.inViewState[idx] ? ' ' + this.props.currentClassName : ''),
        key: counter++,
      })
    })

    return (
      <ul className={ this.props.className ? this.props.className : '' }>
        { items }
      </ul>
    )
  }
}
