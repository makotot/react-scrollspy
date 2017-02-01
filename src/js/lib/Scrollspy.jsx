import React from 'react'
import classNames from 'classnames'

export class Scrollspy extends React.Component {

  static get PropTypes () {
    return {
      items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      currentClassName: React.PropTypes.string.isRequired,
      scrolledPastClassName: React.PropTypes.string,
      style: React.PropTypes.object,
      componentTag: React.PropTypes.string,
      offset: React.PropTypes.number,
      rootNode: React.PropTypes.node,
    }
  }

  static get defaultProps () {
    return {
      items: [],
      currentClassName: '',
      style: {},
      componentTag: 'ul',
      offset: 0,
      rootNode: document.documentElement,
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      targetItems: [],
      inViewState: [],
      isScrolledPast: []
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
      const isScrolled = this._rootNode.scrollTop > 0


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
      scrolledPast: this.props.scrolledPastClassName && this._getScrolledPast(viewStatusList),
    }
  }

  _isInView (el) {
    if (!el) {
      return false
    }
    const rect = el.getBoundingClientRect()
    const root = this._rootNode
    const rootRect = root.getBoundingClientRect()
    const scrollTop = root.scrollTop
    const scrollBottom = scrollTop + rootRect.height
    const elTop = rect.top - rootRect.top + scrollTop + this.props.offset
    const elBottom = elTop + el.offsetHeight

    return (elTop < scrollBottom) && (elBottom > scrollTop)
  }

  _isAtBottom () {
    const rect = this._rootNode.getBoundingClientRect()
    const scrollTop = this._rootNode.scrollTop
    const scrollHeight = this._rootNode.scrollHeight
    const scrolledToBottom = scrollTop + rect.height >= scrollHeight

    return scrolledToBottom
  }

  _getScrolledPast (viewStatusList) {
    if (!viewStatusList.some((item) => item)) {
      return viewStatusList
    }

    let hasFoundInView = false

    const scrolledPastItems = viewStatusList.map((item) => {
      if (item && !hasFoundInView) {
        hasFoundInView = true
        return false
      }
      return !hasFoundInView
    })

    return scrolledPastItems
  }

  _spy (targets) {
    const elemensViewState = this._getElemsViewState(targets)
    this.setState({
      inViewState: elemensViewState.viewStatusList,
      isScrolledPast: elemensViewState.scrolledPast
    })
  }

  _handleSpy () {
    setTimeout(() => this._spy(), 100)
  }

  _initFromProps (props) {
    const targetItems = this._initSpyTarget(props.items)

    this.setState({
      targetItems,
    })

    setTimeout(() => this._spy(targetItems), 100)
  }

  get _rootNode () {
    return this.props.rootNode || document.documentElement
  }

  componentDidMount () {
    this._initFromProps(this.props)
    this._rootNode.addEventListener('scroll', this._handleSpy)
  }

  componentWillUnmount () {
    this._rootNode.removeEventListener('scroll', this._handleSpy)
  }

  componentWillReceiveProps (nextProps) {
    this._rootNode.removeEventListener('scroll', this._handleSpy)

    if (nextProps.rootNode) {
      nextProps.rootNode.addEventListener('scroll', this._handleSpy)
    } else {
      document.documentElement.addEventListener('scroll', this._handleSpy)
    }

    this._initFromProps(nextProps)
  }

  render () {
    const Tag = this.props.componentTag
    let counter = 0
    const items = React.Children.map(this.props.children, (child, idx) => {
      if (!child) {
        return null
      }

      const ChildTag = child.type
      const isScrolledPast = this.props.scrolledPastClassName && this.state.isScrolledPast[idx]
      const childClass = classNames({
        [`${ child.props.className }`]: child.props.className,
        [`${ this.props.currentClassName }`]: this.state.inViewState[idx],
        [`${ this.props.scrolledPastClassName }`]: isScrolledPast,
      })

      return (
        <ChildTag {...child.props} className={ childClass } key={ counter++ }>
          { child.props.children }
        </ChildTag>
      )
    })

    const itemClass = classNames({
      [`${ this.props.className }`]: this.props.className,
    })

    return (
      <Tag className={ itemClass } style={ this.props.style }>
        { items }
      </Tag>
    )
  }
}
