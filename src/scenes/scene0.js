/**
 * Escena principal del juego
 */
export default class Scene0 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene0' })
  }

  preload() {

  }

  create() {
    this.keys = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.keys.space.isDown) this.scene.start('Scene1_1')
  }
}