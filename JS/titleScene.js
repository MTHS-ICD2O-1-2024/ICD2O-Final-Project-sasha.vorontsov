// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Sasha. Vorontsov
// Created on: April 17th
// This file contains the JS functions for index.html

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: "titleScene" })
    
    this.titleSceneBackgroundImage = null
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    console.log("Title Scene")
    this.load.image("titleSceneBackground", "./assets/blue_and_red_screen_image.png")
  }

  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(1.0)
    this.splashSceneBackgroundImage.x = 1440 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2

  }

  update (time,delta) {
  if (time > 6000)
    this.scene.switch("menuScene")
  }
}

export default TitleScene