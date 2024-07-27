import Scene0 from "../scenes/scene0.js"

import Scene1_1 from "../scenes/1/scene1_1.js"
import Scene1_2 from "../scenes/1/scene1_2.js"

const config = {
  originX: 0, // Esto no lo utiliza Phaser directamente, lo uso yo para establecer el origin de cada asset a (0, 0)
  originY: 0,

  type: Phaser.AUTO,
  width: 256,
  height: 240,
  backgroundColor: '#049cd8',
  parent: 'juego01',
  banner: false,
  autoFocus: true,
  autoCenter: true,
  scene: [Scene0, Scene1_1, Scene1_2],
  scale: {
    zoom: 3
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 550 },
      debug: true
    }
  }
}

export default config