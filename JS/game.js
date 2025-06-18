// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Sasha. Vorontsov
// Created on: May 28th
// This file contains the JS functions for index.html

import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"

const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()

const config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: false, // Turn on hitbox visualization
      gravity: { y: 0 } // (optional) to make sure things don't fall
    }
  },
    
    
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    //we place it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
    }
  }

  const game = new Phaser.Game (config)

// load scenes
// NOTE: remeber any "key" is global and CAN NOT be reused
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene) 
game.scene.add('menuScene', menuScene) 
game.scene.add('gameScene', gameScene) 
//start title
game.scene.start('splashScene')
