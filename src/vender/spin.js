const Spinner = require('./spin.min.js');
let addOverlay, removeOverlay, counter = 1;

addOverlay = (function(_this) {
  return function(container) {
    var height, position, top, width, zIndex;
    if ($(container)[0] && $(container)[0].nodeName === "BODY") {
      zIndex = 10000000;
      height = $(window).height();
      width = $(window).width();
      top = $(window).scrollTop();
      $(container).css("overflow", "hidden");
    }
    counter += 1;
    position = $(container).css("position");
    $("<div>").css({
      "z-index": zIndex || 98 + counter,
      "width": width ? width + "px" : "",
      "height": height ? height + "px" : "",
      "top": top || 0
    }).attr({
      "allowTransparency": "true",
      "class": "pb-loading-overlay",
      "scrolling": "no",
      "frameBorder": "0"
    }).appendTo($(container).data("position", position).css("position", "relative"));
    return $("<div>").css({
      top: 0,
      left: 0,
      height: height || "100%"
    }).attr({
      "class": "pb-loading-spin"
    }).appendTo($(".pb-loading-overlay", container));
  };
})(this);

removeOverlay = (function(_this) {
  return function(container) {
    var position, zIndex;
    position = $(container).data("position");
    $(container).css("position", position).find(".pb-loading-overlay").remove();
    if ($(container)[0] && $(container)[0].nodeName === "BODY") {
      zIndex = 10000000;
      return $(container).css("overflow", "");
    }
  };
})(this);


$.fn.spin = function(size, overlayStyles) {
  var defaults;
  defaults = {
    small: {
      lines: 8,
      length: 2,
      width: 2,
      radius: 3,
      zIndex: 1
    },
    medium: {
      lines: 8,
      length: 4,
      width: 3,
      radius: 5,
      zIndex: 1
    },
    large: {
      lines: 10,
      length: 8,
      width: 4,
      radius: 8,
      zIndex: 1
    }
  };
  return this.each(function() {
    var $this, data;
    $this = $(this);
    data = $this.data();
    if (data.spinner) {
      data.spinner.stop();
      delete data.spinner;
      removeOverlay(this);
    }
    if (size !== false) {
      addOverlay(this);
      if (typeof size === 'string') {
        size = defaults[size];
      }
      if (!size) {
        size = defaults["small"];
      }
      return $this.data("spinner", new Spinner(size).spin($(".pb-loading-spin", this)[0]));
    }
  });
};
