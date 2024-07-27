import animationsMario from '../../animations/animationsMario.js'

import positionsMario from '../../config/positions/1_1/positionsMario.js'
import positionsFloorbricks from '../../config/positions/1_1/positionsFloorbricks.js'
import positionsClouds from '../../config/positions/1_1/positionsClouds.js'

import assetsMario from '../../config/assets/assetsMario.js'
import assetsClouds from '../../config/assets/assetsClouds.js'
import assetsFloorbricks from '../../config/assets/assetsFloorbricks.js'

import config from '../../config/config.js'



const { mario } = assetsMario

const { floorbricks } = assetsFloorbricks

const entities = {} // Aquí guardaresmo todas las entidades, útil para las colisiones, animaciones, etc...

export default class Scene1_1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1_1' })
  }

  preload() {
    // Con esto recorremos el objeto assetsClouds con un map sin necesidad de pasarlo a un array
    Object.values(assetsClouds).map(cloud => {
      this.load.image(cloud.name, cloud.asset)
    })

    this.load.image(floorbricks.name, floorbricks.asset)

    this.load.spritesheet(mario.name, mario.asset, { frameWidth: mario.frameWidth, frameHeight: mario.frameHeight })

    //this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
    //this.load.audio('theme', 'assets/sound/music/overworld/theme.mp3')

  }



  create() {
    // Creamos el suelo
    this.createFloorbricks()

    // Creamos las nuebes
    this.createClouds()


    entities.mario = this.physics.add.sprite(positionsMario.mario.x, positionsMario.mario.y, mario.name)
      .setOrigin(config.originX, config.originY)
      .setCollideWorldBounds()
      .setScale(mario.setScale)


    animationsMario(this, mario)

    this.physics.world.setBounds(0, 0, 3584, config.height)
    this.cameras.main.setBounds(0, 0, 3584, config.height)
    this.cameras.main.startFollow(entities.mario)

    this.physics.add.collider(entities.mario, entities.floor)

    entities.keys = this.input.keyboard.createCursorKeys()


    //this.sound.play('theme')
  }



  update() {

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


  /**
   * Generamos el suelo
   */
  createFloorbricks() {
    entities.floor = this.physics.add.staticGroup()
    positionsFloorbricks.map(positionFloorbricks => {
      const floor = this.add.tileSprite(positionFloorbricks.x, positionFloorbricks.y, positionFloorbricks.w, positionFloorbricks.h, positionFloorbricks.key)
        .setOrigin(config.originX, config.originY)
      this.physics.add.existing(floor, true); // true para objeto estático
      entities.floor.add(floor)
    })
  }


  /**
   * Generamos las nubes
   */
  createClouds() {
    positionsClouds.map(cloud => {
      this.add.image(cloud.x, cloud.y, cloud.key)
        .setScale(assetsClouds[cloud.key].setScale)
        .setOrigin(config.originX, config.originY)
    })
  }


}