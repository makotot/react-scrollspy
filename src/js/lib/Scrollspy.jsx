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

      const isLastItem = i === max - 1
      const isScrolled = (document.documentElement.scrollTop || document.body.scrollTop) > 0

      // https://github.com/makotot/react-scrollspy/pull/26#issue-167413769
      if (this._isAtBottom() && this._isInView(currentContent) && !isInView && isLastItem && isScrolled) {
        elemsOutView.pop()
        elemsOutView.push(...elemsInView)
        elemsInView = [currentContent]
        viewStatusList.fill(false)
        isInView = true
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

  _isAtBottom () {
    const doc = document
    const body = doc.body
    const scrollTop = (doc.documentElement && doc.documentElement.scrollTop) || body.scrollTop
    const scrollHeight = (doc.documentElement && doc.documentElement.scrollHeight) || body.scrollHeight
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
    var styles = _.extend({},this.props.style)
    const items = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        className: (child.props.className ? child.props.className : '') + (this.state.inViewState[idx] ? ' ' + this.props.currentClassName : ''),
        key: counter++,
      })
    })

    return (
      <ul className={ this.props.className ? this.props.className : '' } style={styles}>
        { items }
      </ul>
    )
  }
}
