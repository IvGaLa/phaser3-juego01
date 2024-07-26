/**
 * Guardamos las posisicones de los assets
 */

import assets from "../assets/assetsMario.js"

const { mario } = assets

const positionMario = {
  [mario.name]: {
    x: 42,
    y: 196
  }
}


export default positionMario