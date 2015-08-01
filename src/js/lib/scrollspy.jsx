var React = require('react'),
  spy = require('./helpers/spy');


var Scrollspy = {};


Scrollspy.Wrapper = React.createClass({

  mixins: [spy],

  componentDidMount: function () {
    this._mountSpyEvent();
  },

  componentWillUnmount: function () {
    this._unmountSpyEvent();
  },

  render: function () {

    return (
      <div>{ this.props.children }</div>
    );
  }
});


Scrollspy.Content = React.createClass({

  mixins: [spy],

  getInitialState: function () {

    return {
      store: 0,
      isInView: false
    };
  },

  componentDidMount: function () {
    this._mountUpdateEvent();
  },

  componentWillUnmount: function () {
    this._unmountUpdateEvent();
  },

  render: function () {
    var style = {
      position: 'fixed',
      top: 0
    };

    return (
      <div>
        <div style={ style }>{ this.state.store }</div>
        { this.props.children }
      </div>
    );
  }
});

Scrollspy.Navitem = React.createClass({

  getInitialState: function () {

    return {
      isActiveNav: false
    };
  },

  render: function () {

    return (
      <a href={ '#' + this.props.targetId }>{ this.props.children }</a>
    );
  }
});

module.exports = Scrollspy;
