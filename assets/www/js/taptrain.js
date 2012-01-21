//set main namespace
goog.provide('taptrain');

goog.require('lime.Director');
goog.require('lime.Layer');
goog.require('lime.scheduleManager');

goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.Easing');

goog.require('lime.transitions.SlideInDown');
goog.require('lime.transitions.SlideInUp');
goog.require('lime.fill.Frame');

goog.require('lime.GlossyButton');
goog.require('lime.Circle');
goog.require('lime.RoundedRect');

goog.require('console');
goog.require('goog.math');

goog.require('taptrain.Preloader');
goog.require('taptrain.Gamescene');
goog.require('taptrain.Depo');
goog.require('taptrain.Train');

taptrain.WIDTH = 600;
taptrain.HEIGHT  = 1024;

taptrain.Event = {
  DEPO:"open_depo"
}

taptrain.start = function(){
  
	taptrain.director = new lime.Director(document.body,taptrain.WIDTH,taptrain.HEIGHT);
  taptrain.scenes = new Array();
  
  taptrain.sceneStart = new taptrain.Preloader();
  taptrain.sceneGame = new taptrain.Gamescene();
  
	taptrain.director.makeMobileWebAppCapable();
	taptrain.director.replaceScene(taptrain.sceneStart);
  
  
}

taptrain.startGame = function() {
	taptrain.director.replaceScene(taptrain.sceneGame,lime.transitions.SlideInUp);
  taptrain.sceneGame.startGame();
};

taptrain.endGame = function() {
  if (taptrain.director.getCurrentScene() == taptrain.sceneGame) {
    taptrain.sceneGame.endGame();
    taptrain.sceneStart = new taptrain.Preloader();
    taptrain.director.replaceScene(taptrain.sceneStart,lime.transitions.SlideInUp);
    return true;
  } 
  
  return false;
};

goog.exportSymbol('taptrain.start', taptrain.start);
