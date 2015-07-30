var React = require('react');

var inViewport = require('./helpers/in-viewport');

var Scrollspy = {};


Scrollspy.Wrapper = React.createClass({

  getInitialState: function () {

    return {
      elsInView: []
    };
  },

  render: function () {

    return (
      <div>{ this.props.children }</div>
    );
  }
});


Scrollspy.Contents = React.createClass({

  mixins: [inViewport],

  getInitialState: function () {

    return {
      contents: []
    };
  },

  setContents: function () {
    var contents = [];

    React.Children.forEach(this.props.children, function (child) {
      contents.push(child.props.contentId);
    });

    this.setState({
      contents: contents
    });
  },

  componentWillMount: function () {
    this.setContents();
  },

  componentDidMount: function () {
    this.createTargetDOMs();
    window.addEventListener('scroll', this.spy);
  },

  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.spy);
  },

  componentWillUpdate: function () {
  },

  createTargetDOMs: function () {
    var els = [];

    for (var i = 0, max = this.state.contents.length; i < max; i++) {
      els.push((this.refs[this.state.contents[0]]).getDOMNode());
    }
    console.log(els)
  },

  spy: function () {
    console.log(this.isInViewport(this.state.contents));
  },

  render: function () {
    var self = this;

    var children = React.Children.map(this.props.children, function (child, index) {
      return React.cloneElement(child, {
        ref: self.state.contents[index]
      });
    });

    return (
      <div>{ children }</div>
    );
  }
});


Scrollspy.Content = React.createClass({

  render: function () {

    return (
      <div id={ this.props.contentId }>
        { this.props.children }
      </div>
    );
  }
});


Scrollspy.Nav = React.createClass({

  getInitialState: function () {

    return {
      navs: []
    };
  },

  setNavs: function () {
    var navs = [];

    React.Children.forEach(this.props.children, function (child) {
      navs.push(child.props.targetId);
    });

    this.setState({
      navs: navs
    });
  },

  componentWillMount: function () {
    this.setNavs();
  },

  componentDidMount: function () {
    this.createTargetDOMs();
    window.addEventListener('scroll', this.spy);
  },

  componentWillUnmount () {
    window.removeEventListener('scroll', this.spy);
  },

  createTargetDOMs: function () {
    var els = [];

    for (var i = 0, max = this.state.navs.length; i < max; i++) {
      els.push((this.refs[this.state.navs[0]]).getDOMNode());
    }
    console.log(els)
  },

  spy: function () {
  },

  render: function () {
    var self = this;

    var children = React.Children.map(this.props.children, function (child, index) {
      return React.cloneElement(child, {
        ref: self.state.navs[index]
      });
    });

    return (
      <ul>{ children }</ul>
    );
  }
});


Scrollspy.Navitem = React.createClass({

  render: function () {

    return (
      <li>
        <a href={ '#' + this.props.targetId }>
          { this.props.children }
        </a>
      </li>
    );
  }
});


module.exports = Scrollspy;
