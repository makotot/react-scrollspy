var React = require('react'),
  Scrollspy = require('./lib/Scrollspy.jsx');

var App = React.createClass({

  render () {

    var style = {
      height: '300px'
    };

    return (
      <div>

        <section style={ style } id="section-1">section 1</section>
        <section style={ style } id="section-2">section 2</section>
        <section style={ style } id="section-3">section 3</section>

        <Scrollspy items={['section-1', 'section-2', 'section-3']} currentClassName="is-current" className="spy-list">
          <li><a href="#section-1">section 1</a></li>
          <li><a href="#section-2">section 2</a></li>
          <li><a href="#section-3">section 3</a></li>
        </Scrollspy>

      </div>
    );
  }
});


React.render(<App />, document.getElementById('js-app'));
