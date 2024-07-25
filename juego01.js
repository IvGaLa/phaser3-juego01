import { createMarioAnimations } from './src/animations/animations.js';
import assets from './src/config/assets.js'
import config from './src/config/config.js'

config.scene = {
  preload,
  create,
  update
}

const game = new Phaser.Game(config);

const { mario, floorbricks, cloud1 } = assets

const entities = {}

function preload() {
  this.load.image(cloud1.name, cloud1.asset)

  this.load.image(floorbricks.name, floorbricks.asset)

  this.load.spritesheet(mario.name, mario.asset, { frameWidth: mario.frameWidth, frameHeight: mario.frameHeight })

  this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
  this.load.audio('theme', 'assets/sound/music/overworld/theme.mp3')

}

function create() {

  this.add.image(0, 0, cloud1.name)
    .setScale(cloud1.scale)
    .setOrigin(assets.originX, assets.originY)


  const floor = this.add.tileSprite(0, config.height, config.width - 32, 32, floorbricks.name)
    .setOrigin(assets.originX, 1)

  this.physics.add.existing(floor, true); // true para objeto estático

  entities.floor = floor;

  entities.mario = this.physics.add.sprite(32, config.height - 32 - 16, mario.name)
    .setOrigin(assets.originX, assets.originY)
    .setCollideWorldBounds()
    .setGravityY(300)


  createMarioAnimations(this, mario)

  this.physics.world.setBounds(0, 0, 2000, config.height)
  this.cameras.main.setBounds(0, 0, 2000, config.height)
  this.cameras.main.startFollow(entities.mario)

  this.physics.add.collider(entities.mario, entities.floor)

  entities.keys = this.input.keyboard.createCursorKeys()


  this.sound.play('theme')
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
    this.sound.stopByKey('theme')
    this.sound.play('gameover')

    setTimeout(() => {
      entities.mario.setVelocityY(-350)
    }, 100)

    setTimeout(() => {
      this.scene.restart()
    }, 8130) // 8130 son los milisegundos que dura el audio de gameover.
  }

}
