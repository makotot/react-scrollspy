var win = window,
  doc = document;

module.exports = {

  _initSpyTarget: function (items) {
    var targetItems = items.map(function (item) {

      return doc.getElementById(item);
    });

    return targetItems;
  },

  _getElemsViewState: function (targets) {
    var elemsInView = [],
      elemsOutView = [],
      viewStatusList = [];

    var targetItems = targets ? targets : this.state.targetItems;

    var hasInViewAlready = false;

    for (var i = 0, max = targetItems.length; i < max; i++) {
      var currentContent = targetItems[i],
        isInView = hasInViewAlready ? false : this._isInView(currentContent);

      if (isInView) {
        hasInViewAlready = true;
        elemsInView.push(currentContent);
      } else {
        elemsOutView.push(currentContent);
      }

      viewStatusList.push(isInView);
    }

    return {
      inView: elemsInView,
      outView: elemsOutView,
      viewStatusList: viewStatusList
    };
  },

  _isInView: function (el) {
    var winH = win.innerHeight,
      scrollTop = doc.body.scrollTop,
      scrollBottom = scrollTop + winH,
      elTop = el.offsetTop,
      elBottom = elTop + el.offsetHeight;

    return (elTop < scrollBottom) && (elBottom > scrollTop);
  },

  _spy: function (targets) {
    this.setState({
      inViewState: this._getElemsViewState(targets).viewStatusList
    });
  }
};
