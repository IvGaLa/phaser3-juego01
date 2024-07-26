const config = {
  originX: 0, // Esto no lo utiliza Phaser directamente, lo uso yo para establecer el origin de cada asset a (0, 0)
  originY: 0,

  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'juego01',
  banner: false,
  autoFocus: true,
  autoCenter: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
}

export default config