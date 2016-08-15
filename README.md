# react-scrollspy

[![npm version](https://img.shields.io/npm/v/react-scrollspy.svg?style=flat-square)](https://www.npmjs.com/package/react-scrollspy)
[![travis](http://img.shields.io/travis/makotot/react-scrollspy.svg?style=flat-square)](https://travis-ci.org/makotot/react-scrollspy)
[![dependencies](http://img.shields.io/david/makotot/react-scrollspy.svg?style=flat-square)](https://github.com/makotot/react-scrollspy)
[![DevDependencies](http://img.shields.io/david/dev/makotot/react-scrollspy.svg?style=flat-square)](https://github.com/makotot/react-scrollspy)
[![License](http://img.shields.io/npm/l/react-scrollspy.svg?style=flat-square)](https://github.com/makotot/react-scrollspy)

> Scrollspy component


## Install

```sh
$ npm i react-scrollspy
```


## Usage

```js
var Scrollspy = require('react-scrollspy').Scrollspy;

...

<div>

  <div>
    <section id="section-1">section 1</section>
    <section id="section-2">section 2</section>
    <section id="section-3">section 3</section>
  </div>

  <Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current">
    <li><a href="#section-1">section 1</a></li>
    <li><a href="#section-2">section 2</a></li>
    <li><a href="#section-3">section 3</a></li>
  </Scrollspy>

</div>
```


## Props

### `items={ Array }`

Id list of target contents.

### `currentClassName={ String }`

Class name that apply to the navigation element paired with the content element in viewport.

### `style={ Object }`

Style attribute to be passed to the generated &lt;ul/&gt; element [optional]. 

## Development

```sh
$ git clone https://github.com/makotot/react-scrollspy.git
$ cd react-scrollspy
$ npm i
$ npm run start
```

## Contributing

Pull requests and [Reporting a issue](https://github.com/makotot/react-scrollspy/issues/new) are always welcome :)


## License

MIT
