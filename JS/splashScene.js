// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Sasha. Vorontsov
// Created on: April 17th
// This file contains the JS functions for index.html

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: "splashScene" })
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    console.log("Splash Scene")
    this.load.image("splashSceneBackground", "./assets/splashSceneImage.png")
  }

  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "splashSceneBackground" )
    this.splashSceneBackgroundImage.x = 1444 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  update (time,delta) {
    if (time > 3000)
    this.scene.switch ("titleScene")
  }
}

export default SplashScene