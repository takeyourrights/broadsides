(function(fabric) {
  "use strict";

  var canvas = new fabric.Canvas('davy-jones-locker');
  var rect = new fabric.Rect();

  canvas.add(rect);

  canvas.item(0);
  canvas.getObjects();
  canvas.remove(rect);

})(window.fabric);
