goog.provide('taptrain.Gamescene');

taptrain.Gamescene = function() {
    lime.Scene.call(this);
    
    var back = new lime.Sprite()
      .setSize(taptrain.WIDTH, taptrain.HEIGHT)
      .setFill("#0099FF")
    ;
  
    this.layer = new lime.Layer().setPosition(taptrain.WIDTH * 0.5,taptrain.HEIGHT * 0.5);
    
    this.appendChild(this.layer);
    this.layer.appendChild(back);
    var fill = new lime.fill.Frame('media/images/rails.png',0,0,64,64);
    
    for (var i = 0; i < 22; i++) {
      if (i != 13) {
        var rail = new lime.Sprite()
          .setFill(fill)
          .setPosition(0,-480 + i * 48)
        ;
        this.layer.appendChild(rail);
      }
    }
    
    for (i = 0; i < 8; i++) {
        rail = new lime.Sprite()
          .setFill(fill)
          .setPosition(-192,192 + i * 48)
        ;
        this.layer.appendChild(rail);
        rail = new lime.Sprite()
          .setFill(fill)
          .setPosition(192,192 + i * 48)
        ;
        this.layer.appendChild(rail);
    }    
    var k = 1;
    fill = new lime.fill.Frame('media/images/rails.png',k * 64,0,64,64);
    rail = new lime.Sprite()
      .setFill(fill)
      .setPosition(-192,144)
    ;
    this.layer.appendChild(rail);

    k = 2;
    fill = new lime.fill.Frame('media/images/rails.png',k * 64,0,64,64);
    rail = new lime.Sprite()
      .setFill(fill)
      .setPosition(192,144)
    ;
    this.layer.appendChild(rail);

    k = 5;
    fill = new lime.fill.Frame('media/images/rails.png',k * 64,0,64,64);
    rail = new lime.Sprite()
      .setFill(fill)
      .setPosition(-128,144)
    ;
    this.layer.appendChild(rail);
    rail = new lime.Sprite()
      .setFill(fill)
      .setPosition(128,144)
    ;
    this.layer.appendChild(rail);

    rail = new lime.Sprite()
      .setFill(fill)
      .setPosition(-64,144)
    ;
    this.layer.appendChild(rail);
    rail = new lime.Sprite()
      .setFill(fill)
      .setPosition(64,144)
    ;
    this.layer.appendChild(rail);

    k = 0;
    fill = new lime.fill.Frame('media/images/rails.png',k * 64,0,64,64);
    this.switches = new lime.Sprite()
      .setFill(fill)
      .setPosition(0,144)
    ;
    this.layer.appendChild(this.switches);

    this.trains = new Array();
    this.depos = new Array();
    
    this.depos.push(new taptrain.Depo(0));
    this.depos.push(new taptrain.Depo(1));
    this.depos.push(new taptrain.Depo(2));
    
    for (var d in this.depos) {
      this.layer.appendChild(this.depos[d]);
    }
    
    var circ = new lime.Circle()
      .setSize(75,75)
      .setPosition(250, -300)
      .setFill("#00FF00")
    ;
    this.layer.appendChild(circ)
    
    this.hud = new taptrain.Hud();
    this.layer.appendChild(this.hud);
    
  goog.events.listen(circ, ['click'], function(e) {
    taptrain.endGame();
  });    
  
  taptrain.selected_depo = -1;
  
  goog.events.listen(this.depos[0], [taptrain.Event.DEPO,taptrain.Event.DEPO_CLOSE], this.depoSelect, false, this);    
  goog.events.listen(this.depos[1], [taptrain.Event.DEPO,taptrain.Event.DEPO_CLOSE], this.depoSelect, false, this);    
  goog.events.listen(this.depos[2], [taptrain.Event.DEPO,taptrain.Event.DEPO_CLOSE], this.depoSelect, false, this);    
  
  
}
goog.inherits(taptrain.Gamescene, lime.Scene);

taptrain.Gamescene.prototype.depoSelect = function(e) {
    e.stopPropagation();
    taptrain.selected_depo = e.target.depo_type;
    
    if (e.type == taptrain.Event.DEPO) {
      var k = 0;
      switch (e.target.depo_type) {
        case 0: k = 4; break;
        case 1: k = 0; break;
        case 2: k = 3; break;
      }
    } else {
      k = 0;
      taptrain.selected_depo = -1;
    }
    
    var fill = new lime.fill.Frame('media/images/rails.png',k * 64,0,64,64);
    this.switches.setFill(fill);
    
}

taptrain.Gamescene.prototype.getDepo = function(vDepo) {
  return this.depos[vDepo];
}

taptrain.Gamescene.prototype.startGame = function() {
  lime.scheduleManager.scheduleWithDelay(this.reload, this, 4000);
  
  goog.events.listen(taptrain.director, ['stop_train'], function(e) {
    var train = e.event.currentTarget;
    //var depo = this.depos[train.train_type];

    console.log(e)
    var i = this.trains.indexOf(train);
    if (i > -1) this.trains.splice(i,1);
    
    if (e.event.victory == 1) {
      this.layer.appendChild(new taptrain.Star());
      this.hud.setProgress(5);
      
      this.layer.removeChild(train);
      
    } else {
      this.hud.setProgress(-5);
    }
    
    
  },false, this);
  
//  goog.events.listen(taptrain.director, ['backbutton'], function(e) {
//    e.event.stopPropagation();
//    alert("back")
//    this.endGame();
//    taptrain.endGame();
//  },false, this);
  
}
taptrain.Gamescene.prototype.endGame = function() {
  lime.scheduleManager.unschedule(this.reload, this);
  for (var i in this.trains) {
    this.trains[i].deleteTrain();
    this.layer.removeChild(this.trains[i]);
  }
  this.trains = new Array();
}

taptrain.Gamescene.prototype.reload = function() {
  //console.log("reloaded")
  var train = new taptrain.Train();
  this.trains.push(train);
  this.layer.appendChild(train);
}
