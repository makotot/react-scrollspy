var React = require('react');

var Scrollspy = {};

Scrollspy.Wrapper = React.createClass({

  componentDidMount: function () {
    window.addEventListener('scroll', this.spy);
  },

  componentWillUnmount () {
    window.removeEventListener('scroll', this.spy);
  },

  getNavs: function () {
    return React.Children.map(this.props.children, function (child) {
      console.log(child)
    });
  },

  getContents: function () {
  },

  spy: function () {
  },

  render: function () {
    var children = this.props.children;

    console.log(this.getNavs())

    return (
      <div>{ children }</div>
    );
  }
});

Scrollspy.Content = React.createClass({

  propTypes: {},

  componentDidMount: function () {
  },

  render: function () {
    var children = this.props.children;

    return (
      <div>{ children }</div>
    );
  }
});

Scrollspy.nav = React.createClass({

  render: function () {
    var children = this.props.children;

    return (
      <div>{ children }</div>
    );
  }
});


module.exports = Scrollspy;

