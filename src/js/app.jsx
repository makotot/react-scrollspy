var React = require('react'),
  Scrollspy = require('./lib/Scrollspy.jsx');

var App = React.createClass({

  render () {

    var style = {
      height: '300px'
    };

    return (
      <div>

        <div>
          <section style={ style } id="section-1">section 1</section>
          <section style={ style } id="section-2">section 2</section>
          <section style={ style } id="section-3">section 3</section>
        </div>

        <div className="nav-list-wrapper">
          <Scrollspy items={['section-1', 'section-2', 'section-3']} currentClassName="is-current" className="nav-list">
            <li><a href="#section-1">section 1</a></li>
            <li><a href="#section-2">section 2</a></li>
            <li><a href="#section-3">section 3</a></li>
          </Scrollspy>
        </div>

      </div>
    );
  }
});


React.render(<App />, document.getElementById('js-app'));
