goog.provide('taptrain.Preloader');

taptrain.Preloader = function() {
    lime.Scene.call(this);
    
    var back = new lime.Sprite()
      .setSize(taptrain.WIDTH, taptrain.HEIGHT)
      .setFill("#eeeeee")
    ;
  
    var layer = new lime.Layer().setPosition(taptrain.WIDTH * 0.5,taptrain.HEIGHT * 0.5);
  
    
    var btn = new lime.GlossyButton('S\u0101kt sp\u0113li')
      .setPosition(0,taptrain.HEIGHT * 0.5 - 200)
      .setSize(300, 50)
      .setColor("#0000EE")
      .setFontColor("#fff")
      .setRenderer(lime.Renderer.CANVAS);
      
    goog.events.listen(btn, ['mousedown','touchstart'], function() {
        taptrain.startGame();
    });
    
    layer.appendChild(back);
    layer.appendChild(btn);
    this.appendChild(layer);
}
goog.inherits(taptrain.Preloader, lime.Scene);


