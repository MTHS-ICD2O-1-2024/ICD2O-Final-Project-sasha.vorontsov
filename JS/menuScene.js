// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Sasha. Vorontsov
// Created on: April 29th
// This file contains the JS functions for index.html

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: "menuScene" })

    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    console.log('Menu Scene')
    this.load.image("menuSceneBackground", "assets/.jpg")
    this.load.image("startButton", "assets/start.png")
    this.load.image("optionButton", "assets/start.png")
  }

  create (data) {
        this.splashSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground" )
    this.splashSceneBackgroundImage.x = 1440 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1440 / 2, (1440 / 2) + 100, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.clickButton())

    this.optionButton = this.add.sprite(1440 / 2, (1440 / 2) + 100, "optionButton")
    this.optionButton.setInteractive({ useHandCursor: true })
    this.optionButton.on("pointerdown", () => this.clickoptionButton())

    this.menuMsuic =  this.sound.add("menuMusic", {
    loop: true,
    volume: 0.5
    });
    this.menuMusic.play();

    this.menuMusic.stop();
    this.scene.start("gameScene");
  }

  update (time,delta) {
  }

  clickButton() {
    this.scene.start("gameScene")
  }
  clickoptionButton() {
    this.scene.start("optionScene")
  }
}

export default MenuScene