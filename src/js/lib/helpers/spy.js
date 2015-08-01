var win = window,
  store = 0;

module.exports = {

  _mountSpyEvent: function () {

    win.addEventListener('scroll', this._detectInView);
  },

  _unmountSpyEvent: function () {

    win.removeEventListener('scroll', this._detectInView);
  },

  _mountUpdateEvent: function () {
    win.addEventListener('scroll', this._getStore);
  },

  _unmountUpdateEvent: function () {
    win.removeEventListener('scroll', this._getStore);
  },

  _detectInView: function () {

    this._setStore(document.body.scrollTop);
  },

  _setStore: function (pos) {
    store = pos;
  },

  _getStore: function () {
    this.setState({
      store: store
    });
  }
};
