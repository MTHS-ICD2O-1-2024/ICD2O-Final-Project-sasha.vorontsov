// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Sasha. Vorontsov
// Created on: April 29th
// This file contains the JS functions for index.html

class GameScene extends Phaser.Scene {
  createBadnik () {
    for (let i =0; i < 5; i++) {
      const x = 800 + i * 100;
      const y = Phaser.Math.Between(100, 400);
      const badnik = this.badnikGroup.create(x, y, "badnik");
      badnik.setVelocityX(-100);
      badnik.setCollideWorldBounds(true);
      badnik.setBounce(1);
    }
  }
  constructor () {
    super({ key: "gameScene" })

    this.background = null
    this.character = null
    this.fireMissile = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: "65px Arial", fill: "#ffffff", align: "center" }
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log("Game Scene")

    // image
    this.load.image("firstMap", "assets/windmillisle_background.jpg")
    this.load.image("character", "assets/character1.png")
    this.load.image("missile", "assets/missile.png")
    this.load.image("badnik", "assets/badnik1.png")
    // sound
    this.load.audio("laser", "assets/laser1.wav")
    this.load.audio("explosion", "assets/barrelExploding.wav")
  }

  create (data) {
    this.background = this.add.image(0, 0, "firstMap").setScale(1.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)

    this.character = this.physics.add.sprite(1440 / 2, 1440 - 100, "character").setScale(0.5)

    this.missileGroup = this.physics.add.group()

    this.badnikGroup = this.physics.add.group()
    
    this.createBadnik();

    this.physics.add.collider(this.missileGroup, this.badnikGroup, function (missileCollide, badnikCollide) {
      badnikCollide.destroy()
      missileCollide.destroy()
      this.sound.play("explosion")
      this.score = this.score + 1
      this.scoreText.setText("Score: " + this.score.toString())
    this.createBadnik()
    this.createBadnik()
    }.bind(this))
  }  


  update (time,delta) {
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keyUpObj = this.input.keyboard.addKey("UP")
    const keyDownObj = this.input.keyboard.addKey("DOWN")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

  if (keyDownObj.isDown === true) {
    this.character.y += 15
    if (this.character.y < 0) {
      this.character.y = 0
    }
  }
  
  if (keyUpObj.isDown === true) {
    this.character.y -= 15
    if (this.character.y > 1440) {
      this.character.y = 1440
    }
  }
  
  if (keyLeftObj.isDown === true) {
    this.character.x -= 15
    if (this.character.x > 1440) {
      this.character.x = 1440
    }
  }

  if (keyRightObj.isDown === true) {
    this.character.x += 15
    if (this.character.x > 1440) {
      this.character.x = 1440
    }
  }

  if (keyLeftObj.isDown) {
    this.character.angle -= 2;
  } else if (keyRightObj.isDown) {
    this.character.angle += 2;
  }

  if (keySpaceObj.isDown === true) {
    if (this.fireMissile === false) {
      this.fireMissile = true
      const aNewMissile = this.physics.add.sprite(this.character.x, this.character.y, "missile")
      this.missileGroup.add(aNewMissile)
      this.sound.play("laser")
    }
  }

  if (keySpaceObj.isUp === true)  {
      this.fireMissile = false
    }
    
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

export default GameScene
  
  
