import {loader} from 'pixi.js'
import Setup from '../setup'
import {loadProgressHandler, createProject} from '../utils'

const PixiApp = () => {
  let app = createProject()
  document.body.appendChild(app.view)

  loader
    .add('./src/img/treasureHunter.json')
    .on('progress', loadProgressHandler)
    .load(() => Setup(app))
}

export default PixiApp