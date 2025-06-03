// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Sasha. Vorontsov
// Created on: April 29th
// This file contains the JS functions for index.html

class GameScene extends Phaser.Scene {
  createBadniks () {
    const badnikXLocation = Math.floor(Math.random() * 1920) + 1
    let badnikXVelocity = Math.floor(Math.random() * 50) + 1
    badnikXVelocity *= Math.round(Math.random()) ? 1 : -1
    const anBadnik = this.physics.add.sprite(badnikXLocation, 100, "badnik")
    anBadnik.body.velocity.y = 200
    anBadnik.body.velocity.x = badnikXVelocity
    this.badnikGroup.add(anBadnik)
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
    this.load.image("starBackground", "assets/starBackground.png")
    this.load.image("character", "assets/character1.png")
    this.load.image("missile", "assets/missile.png")
    this.load.image("alien", "assets/alien.png")
    // sound
    this.load.audio("laser", "assets/laser1.wav")
    this.load.audio("explosion", "assets/barrelExploding.wav")
  }

  create (data) {
    this.background = this.add.image(0, 0, "starBackground").setScale(2.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)

    this.ship = this.physics.add.sprite(1444 / 2, 1440 - 100, "ship")

    this.missileGroup = this.physics.add.group()

    this.badnikGroup = this.add.group()
    this.createBadnik()

    sprite = this.add.sprite(400, 300, "character");
    sprite.setOrigin(0.5);

    cursors = this.input.keyboard.createCursorKeys();

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
    this.ship.y -= 15
    if (this.ship.y < 0) {
      this.ship.y = 0
    }
  }
  
  if (keyUpObj.isDown === true) {
    this.ship.y += 15
    if (this.ship.y > 1440) {
      this.ship.y = 1440
    }
  }
  
  if (keyLeftObj.isDown) {
    this.sprite.angle -= 2;
  } else if (keyRightObj.isDown) {
    this.sprite.angle += 2;
  }

  if (keySpaceObj.isDown === true) {
    if (this.fireMissile === false) {
      this.fireMissile = true
      const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, "missile")
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
  
  
