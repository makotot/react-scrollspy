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

      viewStatusList.push(isInView)
    }

    return {
      inView: elemsInView,
      outView: elemsOutView,
      viewStatusList,
    }
  }

  _isInView (el) {
    const winH = window.innerHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollBottom = scrollTop + winH
    const elTop = el.offsetTop
    const elBottom = elTop + el.offsetHeight

    return (elTop < scrollBottom) && (elBottom > scrollTop)
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
    window.addEventListener('scroll', this._handleSpy.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._handleSpy.bind(this))
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
      <nav>
        <ul className={ this.props.className ? this.props.className : '' }>
          { items }
        </ul>
      </nav>
    )
  }
}
