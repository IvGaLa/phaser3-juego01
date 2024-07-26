const animationsMario = (game, mario) => {

  const anims = [
    {
      key: 'mariowalk',
      frames: game.anims.generateFrameNumbers(
        mario.name,
        { start: 1, end: 3 }
      ),
      frameRate: 12,
      repeat: -1
    },
    {
      key: 'mariojump',
      frames: [{ key: mario.name, frame: 5 }],
      frameRate: 12,
      repeat: -1
    },
    {
      key: 'mariodead',
      frames: [{ key: mario.name, frame: 4 }],
      frameRate: 12,
      repeat: -1
    }
  ]

  anims.map(anim => {
    if (!game.anims.exists(anim.key)) {
      game.anims.create({
        key: anim.key,
        frames: anim.frames,
        frameRate: anim.frameRate,
        repeat: anim.repeat
      })
    }
  })

}

export default animationsMario