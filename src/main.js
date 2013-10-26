(function(fabric, document, _) {
  "use strict";

  var canvas = new fabric.Canvas('davy-jones-locker', {
    backgroundColor: '#27C',
  });

    fabric.loadSVGFromURL('test-junket.svg', function(objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj.hasControls = false;
      obj.hasBorders = false;
      obj.hoverCursor = null;
      console.log(obj);
      canvas.add(obj).renderAll();
    });

  // initialize canvas
  canvas.setHeight(350);
  canvas.setWidth(600);
  var rect = new fabric.Rect({
    'left':   10,
    'top':    50,
    'width':  20,
    'height': 10,
    'fill':   '#000',
    'stroke': '#000'
  });

  var ammo = 10;
  var rechargeRate = 2000;
  var recharged = true;

  canvas.add(rect);

  var updateAmmo = function() {
    _.map(document.querySelectorAll('.ammo'), function(el) {
      el.innerHTML = ammo;
    });
  };

  updateAmmo();

  var fireCannonball = function() {
    console.log('FIIRREEEEE!!!!!');

    if(!recharged) {
      console.log('Not Ready Sir');
      return false;
    }

    recharged = false;

    setTimeout(function() { recharged = true; }, rechargeRate);

    if(ammo-- <= 0) {
      console.log('FFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUU-');
      return false;
    }

    updateAmmo();

    var cb = new fabric.Circle({
      'left':   rect.get('left'),
      'top':    rect.get('top'),
      'radius': 5,
      'fill':   '#333',
      'stroke': '#999'
    });

    canvas.add(cb);

    cb.animate('left', '+=500', {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      onComplete: function(e) {
        cb.set({
          'radius': 10,
          'fill':   '#FF0',
          'stroke':  '#F00'
        });
        canvas.renderAll();
        setTimeout(function() {
          canvas.remove(cb);
        }, 200);
      }
    });
  }

  document.onkeydown = function(e) {
    if(e.keyCode == 70) {
      fireCannonball();
    }
  };

})(window.fabric, document, _);
