import React from 'react'

const win = window
const doc = document


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

      return doc.getElementById(item)
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
    const winH = win.innerHeight
    const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop
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

  componentDidMount () {
    const targetItems = this._initSpyTarget(this.props.items)

    this.setState({
      targetItems,
    })

    this._spy(targetItems)

    win.addEventListener('scroll', this._handleSpy.bind(this))
  }

  componentWillUnmount () {
    win.removeEventListener('scroll', this._handleSpy.bind(this))
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
