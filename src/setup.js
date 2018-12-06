import { ActionListener, randomInt, getTextureByName } from './utils'
import GameLoop from './GameLoop'
import Play from './Play'
import {Container, DisplayObjectContainer, Graphics, TextStyle, Text} from 'pixi.js'

let gameScene,
  gameOverScene,
  state,
  dungeon,
  door,
  explorer,
  treasure,
  healthBar,
  message,
  explorerHit

let blobs = []
const Setup = (app) => {
  //Create the `gameScene` group
  gameScene = new Container()
  app.stage.addChild(gameScene)
  //Create a `gameOverScene` group
  gameOverScene = new Container()
  app.stage.addChild(gameOverScene)
  
  //Create the `dungeon` sprite
  dungeon = getTextureByName('dungeon.png')
  gameScene.addChild(dungeon)
  //Create the `door` sprite
  door = getTextureByName('door.png')
  door.position.set(32, 0)
  gameScene.addChild(door)
  //Create the `player` sprite
  explorer = getTextureByName('explorer.png')
  explorer.vx = 0//velocity
  explorer.vy = 0//velocity
  explorer.position.set(16, 16)
  gameScene.addChild(explorer)
  ActionListener(explorer)//Assign the player's keyboard controllers
  //Create the `treasure` sprite
  treasure = getTextureByName('treasure.png')
  treasure.position.set(400, 400)
  gameScene.addChild(treasure)

  //Make the enemies
  let numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150,
    speed = 2,
    direction = 1

  for (let i = 0; i < numberOfBlobs; i++) {
    let blob = getTextureByName('blob.png')
    let x = spacing * i + xOffset
    let y = randomInt(0, app.stage.height - blob.height)
    blob.x = x
    blob.y = y
    blob.vy = speed * direction
    direction *= -1
    blobs.push(blob)
    gameScene.addChild(blob)
  }
  //Create the health bar
  healthBar = new DisplayObjectContainer()
  healthBar.position.set(app.stage.width - 170, 4)
  gameScene.addChild(healthBar)

  //Create the black background rectangle
  let innerBar = new Graphics()
  innerBar.beginFill(0x000000)
  innerBar.drawRect(0, 0, 128, 8)
  innerBar.endFill()
  healthBar.addChild(innerBar)

  //Create the front red rectangle
  let outerBar = new Graphics()
  outerBar.beginFill(0xFF3300)
  outerBar.drawRect(0, 0, 128, 8)
  outerBar.endFill()
  healthBar.addChild(outerBar)
  healthBar.outer = outerBar
  //Add some text for the game over message
  let style = new TextStyle({
    fontFamily: 'Futura',
    fontSize: 64,
    fill: 'white'
  })
  message = new Text('The End!', style)
  message.x = 120
  message.y = app.stage.height / 2 - 32
  gameOverScene.addChild(message)
  //set the game state to `play`
  state = () => Play(explorer, blobs, treasure, door, healthBar, explorerHit, gameScene, gameOverScene, message, state)
  //add `gameScene` to the stage
  app.stage.addChild(gameScene)
  //animation
  app.ticker.add(() => GameLoop(state))
}

export default Setup