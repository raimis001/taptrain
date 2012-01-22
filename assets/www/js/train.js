goog.provide('taptrain.Train');


taptrain.Train = function() {
    lime.Sprite.call(this);
    
    this.train_type = goog.math.randomInt(3);
    
    var set = taptrain.Depo.settings[this.train_type];
    
    var posE = new goog.math.Coordinate(0,48);// taptrain.HEIGHT * 0.5 - 80);
    var posS = new goog.math.Coordinate(0,-480);
    
    //console.log(this.getPosition());
    
    var rect = new lime.RoundedRect()
      .setSize(85,40)
      .setFill(set.color)
    ;    
  
    var frame = new lime.fill.Frame('media/images/trains.png', this.train_type * 70, 0, 70, 126); //x , y, width, height
    var train = new lime.Sprite()
      .setAnchorPoint(0.5,0.3)
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

  var posE;
  switch (taptrain.selected_depo) {
    case -1:
    case 1:
      posE = taptrain.sceneGame.getDepo(1).getPosition();
      this.move  = new lime.animation.MoveTo(posE).setDuration(1.8).setEasing(lime.animation.Easing.LINEAR);
      break;
    case 0:
      posE = taptrain.sceneGame.getDepo(0).getPosition();
      this.move  = new lime.animation.Sequence(
        new lime.animation.Spawn(
          new lime.animation.MoveBy(0,96).setDuration(0.3).setEasing(lime.animation.Easing.LINEAR),
          new lime.animation.RotateBy(-90).setDuration(0.3).setEasing(lime.animation.Easing.LINEAR)
        ),
        new lime.animation.MoveBy(-96,0).setDuration(0.6).setEasing(lime.animation.Easing.LINEAR),
        new lime.animation.Spawn(
          new lime.animation.MoveBy(-96,0).setDuration(0.3).setEasing(lime.animation.Easing.LINEAR),
          new lime.animation.RotateBy(90).setDuration(0.3).setEasing(lime.animation.Easing.LINEAR)
        ),
        new lime.animation.MoveBy(0,288).setDuration(1).setEasing(lime.animation.Easing.LINEAR)
      )
      break;
    case 2:
      posE = taptrain.sceneGame.getDepo(2).getPosition();
      this.move  = new lime.animation.Sequence(
        new lime.animation.Spawn(
          new lime.animation.MoveBy(0,96).setDuration(0.3).setEasing(lime.animation.Easing.LINEAR),
          new lime.animation.RotateBy(90).setDuration(0.3).setEasing(lime.animation.Easing.LINEAR)
        ),
        new lime.animation.MoveBy(96,0).setDuration(0.6).setEasing(lime.animation.Easing.LINEAR),
        new lime.animation.Spawn(
          new lime.animation.MoveBy(96,0).setDuration(0.3).setEasing(lime.animation.Easing.LINEAR),
          new lime.animation.RotateBy(-90).setDuration(0.3).setEasing(lime.animation.Easing.LINEAR)
        ),
        new lime.animation.MoveBy(0,288).setDuration(1).setEasing(lime.animation.Easing.LINEAR)
      )
      break;
  }
  
  this.runAction(this.move);
  goog.events.listen(this.move, lime.animation.Event.STOP, this.stopMove ,false, this);
  
  
  //this.scale.stop();
}
taptrain.Train.prototype.stopMove = function() {
  
  var myevent = new goog.events.Event('stop_train'); 
  myevent.currentTarget = this;
  
  if (taptrain.selected_depo != this.train_type ) {
    this.move = new lime.animation.MoveBy(0,288).setDuration(1).setEasing(lime.animation.Easing.LINEAR)
    this.runAction(this.move);
    goog.events.listen(this.move, lime.animation.Event.STOP, this.deleteTrain ,false, this);
    
    myevent.victory = 0;
  } else {
    myevent.victory = 1;
  }
  
  taptrain.director.eventDispatcher.handleEvent(myevent); 
  
}
taptrain.Train.prototype.deleteTrain = function() {
  this.getParent().removeChild(this);
}
