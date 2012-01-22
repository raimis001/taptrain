goog.provide('taptrain.Depo');


taptrain.Depo = function(vType) {
    lime.Sprite.call(this);
    
    this.depo_type = vType;
    this.depo_opened = false;
        
    var set = taptrain.Depo.settings[vType];
      
    this.setPosition(set.pos.x, taptrain.HEIGHT * 0.5 - 80 + set.pos.y)
        
    var circle = new lime.Circle()
      .setSize(85,85)
      .setFill(set.color)
    ;
    
    this.appendChild(circle);

    
    this.depo_door = new lime.Sprite()
      .setPosition(0,-45)
    ;
    this.doorManipulate(false);
    this.appendChild(this.depo_door);

    var t = this;
   
    goog.events.listen(circle, ['mousedown','touchstart'], function(e) {
      e.stopPropagation();
      t.doorManipulate(true);
      t.dispatchEvent({type: taptrain.Event.DEPO});
//      e.swallow(['mouseup','touchend'],function(){
//        t.doorManipulate(false);
//      }, false, this);

    }, false, this);

    goog.events.listen(taptrain.director, ['mouseup','touchend','touchcancel'], function() {
      if (t.depo_opened) {
        t.doorManipulate(false);
        t.dispatchEvent({type: taptrain.Event.DEPO_CLOSE});
      }
    }, false, this);

}
goog.inherits(taptrain.Depo, lime.Sprite);

taptrain.Depo.prototype.doorManipulate = function(vOpen) {
  this.depo_opened = vOpen;
  
  var frame;
  if (this.depo_opened) {
    frame = new lime.fill.Frame('media/images/depo_door.png', 75, 0, 75, 40);
  } else {
    frame = new lime.fill.Frame('media/images/depo_door.png', 0, 0, 75, 40);
  }
  this.depo_door.setFill(frame);
}

taptrain.Depo.settings = {
  "0":{
    pos:{x:-200,y:0},
    color:"#EE0000"
  },
  "1":{
    pos:{x:0,y:0},
    color:"#00EE00"
  },
  "2":{
    pos:{x:200,y:0},
    color:"#0000EE"
  }
}

