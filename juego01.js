import animationsMario from './src/animations/animationsMario.js';

import positionMario from './src/config/positions/positionsMario.js';

import assetsMario from './src/config/assets/assetsMario.js'
import assetsClouds from './src/config/assets/assetsClouds.js'
import assetsFloorbricks from './src/config/assets/assetsFloorbricks.js'

import config from './src/config/config.js'

config.scene = {
  preload,
  create,
  update
}

const game = new Phaser.Game(config);

const { mario } = assetsMario
const { cloud1, cloud2, cloud3 } = assetsClouds
const { floorbricks } = assetsFloorbricks

const entities = {} // Aquí guardaresmo todas las entidades, útil para las colisiones, animaciones, etc...

function preload() {
  this.load.image(cloud3.name, cloud3.asset)

  this.load.image(floorbricks.name, floorbricks.asset)

  this.load.spritesheet(mario.name, mario.asset, { frameWidth: mario.frameWidth, frameHeight: mario.frameHeight })

  //this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
  //this.load.audio('theme', 'assets/sound/music/overworld/theme.mp3')

}

function create() {

  this.add.image(0, 0, cloud3.name)
    .setScale(cloud3.scale)
    .setOrigin(config.originX, config.originY)

  const floor = this.add.tileSprite(0, config.height, config.width - 32, 32, floorbricks.name)
    .setOrigin(config.originX, 1)

  this.physics.add.existing(floor, true); // true para objeto estático

  entities.floor = floor;

  entities.mario = this.physics.add.sprite(positionMario.mario.x, positionMario.mario.y, mario.name)
    .setOrigin(config.originX, config.originY)
    .setCollideWorldBounds()
    .setGravityY(300)


  animationsMario(this, mario)

  this.physics.world.setBounds(0, 0, 2000, config.height)
  this.cameras.main.setBounds(0, 0, 2000, config.height)
  this.cameras.main.startFollow(entities.mario)

  this.physics.add.collider(entities.mario, entities.floor)

  entities.keys = this.input.keyboard.createCursorKeys()


  //this.sound.play('theme')
}

function update() {

  if (entities.mario.isDead) return

  if (entities.keys.left.isDown) {
    entities.mario.x -= 2
    entities.mario.anims.play('mariowalk', true)
    entities.mario.flipX = true
  } else if (entities.keys.right.isDown) {
    entities.mario.x += 2
    entities.mario.anims.play('mariowalk', true)
    entities.mario.flipX = false
  } else {
    entities.mario.setFrame(0)
  }

  if (entities.keys.space.isDown && entities.mario.body.touching.down) {
    entities.mario.setVelocityY(-300)
    entities.mario.anims.play('mariojump', true)
  }

  if (entities.mario.y >= config.height - entities.mario.height) {
    entities.mario.anims.play('mariodead')
    entities.mario.isDead = true
    entities.mario.setCollideWorldBounds(false)
    //this.sound.stopByKey('theme')
    //this.sound.play('gameover')

    setTimeout(() => {
      entities.mario.setVelocityY(-350)
    }, 100)

    setTimeout(() => {
      this.scene.restart()
    }, 100) // 8130 son los milisegundos que dura el audio de gameover.
  }

}
