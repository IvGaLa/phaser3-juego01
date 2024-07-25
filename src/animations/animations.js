export const createMarioAnimations = (game, mario) => {
  game.anims.create({
    key: 'mariowalk',
    frames: game.anims.generateFrameNumbers(
      mario.name,
      { start: 1, end: 3 }
    ),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'mariojump',
    frames: [{ key: mario.name, frame: 5 }],
    repeat: -1
  })

  game.anims.create({
    key: 'mariodead',
    frames: [{ key: mario.name, frame: 4 }],
    repeat: -1
  })
}
