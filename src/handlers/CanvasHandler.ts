import { fabric } from 'fabric'
import { CanvasOptions, HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'

class CanvasHandler extends BaseHandler {
  public options: CanvasOptions
  public brushWidth: number
  public texturePatternBrush : any = new fabric.PatternBrush(this.canvas)
  public freeDrawOptions : Object = new Object()
  constructor(props: HandlerOptions) {
    super(props)
    this.options = {
      width: props.canvas.width,
      height: props.canvas.height,
    }
    this.brushWidth = 30
    
    this.initialize()
  }

  initialize() { 
    // @ts-ignore
    this.canvas.on({
      'path:created': this.handleDrawnPath,
    })
  }

  handleDrawnPath = (e : any) => {
      console.log("test", e)
      e.path.set()
      this.context.setActiveObject(null)
      this.handlers.historyHandler.save('object:created')
      this.canvas.renderAll()
  }
  
  setDrawingMode(setting) {
    this.canvas.isDrawingMode = setting
  }

  setBrushWidth(setting) {
    this.brushWidth = setting
    this.canvas.freeDrawingBrush.width = this.brushWidth
  }

  setTexturePatternBrush = async imgOptions => {
    this.freeDrawOptions = imgOptions
    let img = new Image();
    img.src = imgOptions.metadata.src
    
    this.context.setActiveObject(null)
    this.canvas.isDrawingMode = true
    this.texturePatternBrush.source = img

    this.texturePatternBrush.width = this.brushWidth
    this.canvas.freeDrawingBrush = this.texturePatternBrush
    
    this.canvas.requestRenderAll()
  }

  resize(nextWidth, nextHeight) {
    this.canvas.setWidth(nextWidth).setHeight(nextHeight)
    this.canvas.renderAll()
    const diffWidth = nextWidth / 2 - this.options.width / 2
    const diffHeight = nextHeight / 2 - this.options.height / 2

    this.options.width = nextWidth
    this.options.height = nextHeight

    const deltaPoint = new fabric.Point(diffWidth, diffHeight)
    this.canvas.relativePan(deltaPoint)
  }
}

export default CanvasHandler
