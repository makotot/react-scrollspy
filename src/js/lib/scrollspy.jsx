var React = require('react'),
  spy = require('./helpers/spy');


var Scrollspy = {};

var win = window;


Scrollspy = React.createClass({

  mixins: [spy],

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

  componentDidMount: function () {
    var targetItems = this._initSpyTarget(this.props.items);

    this.setState({
      targetItems: targetItems
    });

    this._spy(targetItems);

    win.addEventListener('scroll', this.handleSpy);
  },

  componentWillUnmount: function () {
    win.removeEventListener('scroll', this.handleSpy);
  },

  handleSpy: function () {
    this._spy();
  },

  render: function () {
    var items = this.props.children.map(function (child, idx) {

      return React.cloneElement(child, {
        className: (child.props.className ? child.props.className : '') + (this.state.inViewState[idx] ? ' ' + this.props.currentClassName : '')
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
