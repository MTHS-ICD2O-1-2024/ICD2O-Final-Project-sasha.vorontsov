// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Sasha. Vorontsov
// Created on: April 29th
// This file contains the JS functions for index.html

class GameScene extends Phaser.Scene {
  createBadnik () {
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(100, 1400);
      const y = Phaser.Math.Between(100, 600);
      const badnik = this.badnikGroup.create(x, y, "badnik");
      badnik.setCollideWorldBounds(true);
      badnik.setBounce(1);
    }
  }

  constructor () {
    super({ key: "gameScene" });

    this.background = null;
    this.character = null;
    this.fireMissile = false;
    this.lastFired = 0;
    this.missileCooldown = 500;

    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = { font: "65px Arial", fill: "#ffffff", align: "center" };
  
    this.timerText = null;
    this.timeLeft = 20;
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Game Scene");

    this.load.image("firstMap", "assets/windmillisle_background.jpg");
    this.load.image("character", "assets/character1.png");
    this.load.image("missile", "assets/missile.png");
    this.load.image("badnik", "assets/badnik1.png");

    this.load.audio("laser", "assets/laser1.wav");
    this.load.audio("explosion", "assets/barrelExploding.wav");
  }

  createBadnikWave (count = 5) {
    for (let i = 0; i < count; i++) {
      const x = Phaser.Math.Between(800, 1200);
      const y = Phaser.Math.Between(100, 600);
      const badnik = this.badnikGroup.create(x, y, "badnik");
      badnik.setCollideWorldBounds(true);
      badnik.setBounce(1);
      badnik.setVelocity(Phaser.Math.Between(-50, -100), Phaser.Math.Between(-30, 30));
    }
  }


  create (data) {
    this.background = this.add.image(0, 0, "firstMap").setScale(2.0);
    this.background.setOrigin(0, 0);

    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle);

    this.timerText = this.add.text(1200, 10, "Time: " + this.timeLeft, this.scoreTextStyle);

    this.character = this.physics.add.sprite(1440 / 2, 1440 - 100, "character").setScale(0.5);

    this.missileGroup = this.physics.add.group();
    this.badnikGroup = this.physics.add.group();
    
    this.dialogueLines = [
      "The world is in striving danger...",
      "You, the chosen one, must defeat the badniks!",
      "Use your missiles wisely. The fate of Windmill Isle depends on you!"
    ];
    this.dialogueIndex = 0;

    this.dialogueText = this.add.text(100, 100, "", {
      font: "32px Arial",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 10, y: 10 },
      wordWrap: { width: 1200 }
    });

    this.input.keyboard.on("keydown-SPACE", () => {
      this.showNextDialogue();
    });

    this.showNextDialogue();

    this.createBadnikWave();

    // Changed from collider to overlap
    this.physics.add.overlap(this.missileGroup, this.badnikGroup, (missile, badnik) => {
      console.log("💥 Hit!");
      this.sound.play("explosion");
      this.hitBadnik(missile, badnik);
      this.score += 1;
      this.scoreText.setText("Score: " + this.score.toString());
    });

    // Countdown every second
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });
    
  }

  updateTimer() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      this.timerText.setText("Time: " + this.timeLeft);
    } else {
      this.endGame();
    }
  }

  endGame() {
    this.physics.pause();

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.add.text(centerX, centerY - 100, "GAME OVER", {
      font: "72px Arial",
      fill: "#ff0000",
      align: "center"
    }).setOrigin(0.5);

    this.add.text(centerX, centerY, "Final Score: " + this.score, {
      font: "48px Arial",
      fill: "#ffffff"
    }).setOrigin(0.5);

    const nextButton = this.add.text(centerX, centerY + 100, "Next Level", {
      font: "48px Arial",
      fill: "#00ff00",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    nextButton.on("pointerdown", () => {
      this.scene.start("nextLevelScene"); // Replace with actual next level key
    });
  }


  showNextDialogue() {
    if (this.dialogueIndex < this.dialogueLines.length) {
      this.dialogueText.setText(this.dialogueLines[this.dialogueIndex]);
      this.dialogueIndex++;
    } else {
      this.dialogueText.destroy();
    }
  }

  hitBadnik(missile, badnik) {
    missile.destroy();  
    badnik.destroy();  
  }

  update (time, delta) {
    if (this.dialogueText && this.dialogueText.active) {
      return;
    }

    if (this.timeLeft <= 0) {
      return;
    }

    const keyLeftObj = this.input.keyboard.addKey("LEFT");
    const keyRightObj = this.input.keyboard.addKey("RIGHT");
    const keyUpObj = this.input.keyboard.addKey("UP");
    const keyDownObj = this.input.keyboard.addKey("DOWN");
    const keySpaceObj = this.input.keyboard.addKey("SPACE");

    if (keyDownObj.isDown) {
      this.character.y += 15;
    }

    if (keyUpObj.isDown) {
      this.character.y -= 15;
    }

    if (keyLeftObj.isDown) {
      this.character.x -= 15;
      this.character.angle -= 2;
    } else if (keyRightObj.isDown) {
      this.character.x += 15;
      this.character.angle += 2;
    }

    // FIRE MISSILE with cooldown
    if (keySpaceObj.isDown && time > this.lastFired + this.missileCooldown) {
      this.lastFired = time;

      const missile = this.physics.add.sprite(this.character.x, this.character.y, "missile");
      missile.setAngle(this.character.angle);
      this.missileGroup.add(missile);

      this.sound.play("laser");

      const angleRad = Phaser.Math.DegToRad(this.character.angle);
      const speed = 400;
      missile.setVelocity(Math.cos(angleRad) * speed, Math.sin(angleRad) * speed);
    }

    // Destroy missiles off screen
    this.missileGroup.children.each((missile) => {
      if (missile.x < -50 || missile.x > 1600 || missile.y < -50 || missile.y > 1600) {
        missile.destroy();
      }
    });

    // Destroy badniks off screen
    this.badnikGroup.children.each((badnik) => {
      if (badnik.x < -50 || badnik.x > 1600 || badnik.y < -50 || badnik.y > 1600) {
        badnik.destroy();
      }
    });

    // Make badniks track the player
    this.badnikGroup.children.each((badnik) => {
      if (badnik.active) {
        const dx = this.character.x - badnik.x;
        const dy = this.character.y - badnik.y;
        const angle = Math.atan2(dy, dx);
        const speed = 60;

        badnik.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      }
    });

    // Check for new wave
    if (this.badnikGroup.countActive(true) === 0) {
      this.createBadnikWave();
    }
  }
}

export default GameScene;