var React = require('react'),
  Scrollspy = require('./lib/Scrollspy.jsx');

var ScrollspyWrapper = Scrollspy.Wrapper,
  ScrollspyContent = Scrollspy.Content,
  ScrollspyNav = Scrollspy.nav;


var App = React.createClass({

  render () {

    var style = {
      height: '500px'
    };

    return (
      <ScrollspyWrapper>

        <ScrollspyContent>

          <section style={ style } id="section-1">
            section 1
          </section>
          <section style={ style } id="section-2">
            section 2
          </section>
          <section style={ style } id="section-3">
            section 3
          </section>

        </ScrollspyContent>

        <ScrollspyNav>
          <nav>
            <ul>
              <li><a href="#section-1">section 1</a></li>
              <li><a href="#section-2">section 2</a></li>
              <li><a href="#section-3">section 3</a></li>
            </ul>
          </nav>
        </ScrollspyNav>

      </ScrollspyWrapper>
    );
  }
});


React.render(<App />, document.getElementById('js-app'));

