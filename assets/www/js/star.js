goog.provide('taptrain.Star');


taptrain.Star = function() {
    lime.Sprite.call(this);

    this
      .setFill('media/images/star.png')
      .setPosition(-150,0)
      .setScale(0.3)
   ;
   
  var anim = new lime.animation.Spawn(
    new lime.animation.MoveBy(0,-200).setDuration(2),
    new lime.animation.ScaleTo(0).setDuration(2)
  )

  this.runAction(anim);
  goog.events.listen(anim, lime.animation.Event.STOP, function() {
    this.getParent().removeChild(this);
  } ,false, this);
  
}
goog.inherits(taptrain.Star, lime.Sprite);

