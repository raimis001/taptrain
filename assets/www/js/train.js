goog.provide('taptrain.Train');


taptrain.Train = function() {
    lime.Sprite.call(this);
    
    this.train_type = goog.math.randomInt(3);
    
    var set = taptrain.Depo.settings[this.train_type];
    
    var posE = new goog.math.Coordinate(0, taptrain.HEIGHT * 0.5 - 80);
    var posS = new goog.math.Coordinate(0,taptrain.HEIGHT * -0.5 + 50);
    
    //console.log(this.getPosition());
    
    var rect = new lime.RoundedRect()
      .setSize(85,40)
      .setFill(set.color)
    ;    
  
    var frame = new lime.fill.Frame('media/images/train.png', 0, 0, 160, 160); //x , y, width, height
    var train = new lime.Sprite()
      .setFill(frame)
    ;
    
    var atn = -Math.atan2(posS.y - posE.y, posS.x - posE.x) * (180 / Math.PI) - 90 ;
    this
      .setPosition(posS)
      //.setScale(0.5)
      //.appendChild(rect)
      .appendChild(train)
      .setRotation(atn)
    ;
    
    //posE = taptrain.sceneGame.getDepo(this.train_type).getPosition();
    
    //this.scale = new lime.animation.ScaleTo(1).setDuration(3).setEasing(lime.animation.Easing.LINEAR);
    this.move  = new lime.animation.MoveTo(posE).setDuration(3).setEasing(lime.animation.Easing.LINEAR);
    
    //this.show = new lime.animation.Spawn(this.scale,this.move);
    this.runAction(this.move);
    
    goog.events.listen(this.move, lime.animation.Event.STOP, this.endMove ,false, this);
    
}
goog.inherits(taptrain.Train, lime.Sprite);

taptrain.Train.prototype.setDepo = function(vDepo) {
    var posE = taptrain.sceneGame.getDepo(vDepo).getPosition();
    this.move.setPosition(posE);
  
}

taptrain.Train.prototype.endMove = function() {
  //this.removeChild(this);
  
  var myevent = new goog.events.Event('stop_train'); 
  myevent.currentTarget = this;
  taptrain.director.eventDispatcher.handleEvent(myevent); 
  
  //this.scale.stop();
}

taptrain.Train.prototype.deleteTrain = function() {
  this.scale.stop();
  goog.events.unlisten(this.scale, lime.animation.Event.STOP, this.endMove ,false, this);
}
