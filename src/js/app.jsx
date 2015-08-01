var React = require('react'),
  Scrollspy = require('./lib/Scrollspy.jsx');

//var ScrollspyContents = Scrollspy.Contents,
var ScrollspyWrapper = Scrollspy.Wrapper,
  ScrollspyContent = Scrollspy.Content,
//  ScrollspyNav = Scrollspy.Nav,
  ScrollspyNavitem = Scrollspy.Navitem;


var App = React.createClass({

  render () {

    var style = {
      height: '300px'
    };

    return (
      <ScrollspyWrapper>
        <div>

          <ScrollspyContent contentId="section-1">
            <div style={ style }>
              section 1
            </div>
          </ScrollspyContent>

          <ScrollspyContent contentId="section-2">
            <div style={ style }>
              section 2
            </div>
          </ScrollspyContent>

          <ScrollspyContent contentId="section-3">
            <div style={ style }>
              section 3
            </div>
          </ScrollspyContent>

          <ScrollspyContent contentId="section-4">
            <div style={ style }>
              section 4
            </div>
          </ScrollspyContent>

        </div>

        <nav>

          <ScrollspyNavitem targetId="section-1">section 1</ScrollspyNavitem>
          <ScrollspyNavitem targetId="section-2">section 2</ScrollspyNavitem>
          <ScrollspyNavitem targetId="section-3">section 3</ScrollspyNavitem>
          <ScrollspyNavitem targetId="section-4">section 4</ScrollspyNavitem>

        </nav>

      </ScrollspyWrapper>
    );
  }
});


React.render(<App />, document.getElementById('js-app'));
