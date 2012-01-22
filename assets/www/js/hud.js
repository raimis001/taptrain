goog.provide('taptrain.Hud');


taptrain.Hud = function() {
    lime.Sprite.call(this);
    
    this.progress = new lime.Sprite()
      .setAnchorPoint(0,0)
      .setPosition(-250,-450)
    ;
    
    var rect = new lime.RoundedRect()
      .setAnchorPoint(0,0)
      .setSize(50,300)
      .setFill("#aaa")
    ;
    this.progress.appendChild(rect);
    
    this.prog = new lime.RoundedRect()
      .setAnchorPoint(0,0)
      .setPosition(0,300)
      .setSize(50,0)
      .setFill("#006600")
      
    this.progress.appendChild(this.prog);
    
    this.current_progress = 0;
    
    this.appendChild(this.progress);
}
goog.inherits(taptrain.Hud, lime.Sprite);

taptrain.Hud.prototype.setProgress = function(vProgress) {
  this.current_progress += vProgress;
  if (this.current_progress > 100) this.current_progress = 100;
  if (this.current_progress < 0) this.current_progress = 0;
  var prg = 300 * (this.current_progress / 100);
  this.prog
    .setPosition(0,300 - prg)
    .setSize(50,prg)
  ;
}
