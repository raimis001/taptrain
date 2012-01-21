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
    var fill = new lime.fill.Image('media/images/rail1.png');
    
    for (var i = 0; i < 22; i++) {
      var rail = new lime.Sprite()
        .setFill(fill)
        .setPosition(0,taptrain.HEIGHT * -0.5 + i * 48)
      ;
      this.layer.appendChild(rail);
    }
    
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
  goog.events.listen(circ, ['click'], function(e) {
    taptrain.endGame();
  });    
  
  goog.events.listen(this.depos[0], [taptrain.Event.DEPO], this.depoSelect);    
  goog.events.listen(this.depos[1], [taptrain.Event.DEPO], this.depoSelect);    
  goog.events.listen(this.depos[2], [taptrain.Event.DEPO], this.depoSelect);    
  
}
goog.inherits(taptrain.Gamescene, lime.Scene);

taptrain.Gamescene.prototype.depoSelect = function(e) {
      e.stopPropagation();
    console.log(e);
    console.log(e.target.depo_type);
}

taptrain.Gamescene.prototype.getDepo = function(vDepo) {
  return this.depos[vDepo];
}

taptrain.Gamescene.prototype.startGame = function() {
  lime.scheduleManager.scheduleWithDelay(this.reload, this, 3000);
  
  goog.events.listen(taptrain.director, ['stop_train'], function(e) {
    var train = e.event.currentTarget;
    var depo = this.depos[train.train_type];


    if (depo.depo_opened) {
      console.log("Pluss viens punkts");
    } else {
      console.log("MIINUSS");
    }
    
    var i = this.trains.indexOf(train);
    if (i > -1) this.trains.splice(i,1);
    //console.log("find train:" + i)
    this.layer.removeChild(train);
    
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
