// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Sasha. Vorontsov
// Created on: April 17th
// This file contains the JS functions for index.html

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: "titleScene" })
    
    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { 
      font: "200px Times", 
      fill: "# fde4b9", 
      align: "center" }
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    console.log("Title Scene")
    this.load.image("titleSceneBackground", "./assets/aliens_screen_image.jpg")
  }

  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(2.75)
    this.splashSceneBackgroundImage.x = 1440 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2

    this.titleSceneText = this.add.text (1440 / 2, 1080 / 2 + 350, "Sonic: Infinite Drive", this.titleSceneTextStyle)
    .setOrigin(0.5)
  }

  update (time,delta) {
  if (time > 6000)
    this.scene.switch("menuScene")
  }
}

export default TitleScene