var React = require('react');


var Scrollspy = {};

var win = window,
  doc = document;


Scrollspy = React.createClass({

  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    currentClassName: React.PropTypes.string.isRequired
  },

  getInitialState: function () {

    return {
      targetItems: [],
      inViewState: []
    };
  },

  _initSpyTarget: function (items) {
    var targetItems = items.map(function (item) {

      return doc.getElementById(item);
    });

    return targetItems;
  },

  _getElemsViewState: function (targets) {
    var elemsInView = [],
      elemsOutView = [],
      viewStatusList = [];

    var targetItems = targets ? targets : this.state.targetItems;

    var hasInViewAlready = false;

    for (var i = 0, max = targetItems.length; i < max; i++) {
      var currentContent = targetItems[i],
        isInView = hasInViewAlready ? false : this._isInView(currentContent);

      if (isInView) {
        hasInViewAlready = true;
        elemsInView.push(currentContent);
      } else {
        elemsOutView.push(currentContent);
      }

      viewStatusList.push(isInView);
    }

    return {
      inView: elemsInView,
      outView: elemsOutView,
      viewStatusList: viewStatusList
    };
  },

  _isInView: function (el) {
    var winH = win.innerHeight,
      scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop,
      scrollBottom = scrollTop + winH,
      elTop = el.offsetTop,
      elBottom = elTop + el.offsetHeight;

    return (elTop < scrollBottom) && (elBottom > scrollTop);
  },

  _spy: function (targets) {
    this.setState({
      inViewState: this._getElemsViewState(targets).viewStatusList
    });
  },

  _handleSpy: function () {
    var timer;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(this._spy, 100);
  },

  componentDidMount: function () {
    var targetItems = this._initSpyTarget(this.props.items);

    this.setState({
      targetItems: targetItems
    });

    this._spy(targetItems);

    win.addEventListener('scroll', this._handleSpy);
  },

  componentWillUnmount: function () {
    win.removeEventListener('scroll', this._handleSpy);
  },

  render: function () {
    var counter = 0,
      items = this.props.children.map(function (child, idx) {

      return React.cloneElement(child, {
        className: (child.props.className ? child.props.className : '') + (this.state.inViewState[idx] ? ' ' + this.props.currentClassName : ''),
        key: counter++
      });

    }.bind(this));

    return (
      <nav>
        <ul className={ this.props.className ? this.props.className : '' }>
          { items }
        </ul>
      </nav>
    );
  }
});

module.exports = Scrollspy;
