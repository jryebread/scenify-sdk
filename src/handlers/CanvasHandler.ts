import { fabric } from 'fabric'
import { CanvasOptions, HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'

class CanvasHandler extends BaseHandler {
  public options: CanvasOptions
  constructor(props: HandlerOptions) {
    super(props)
    this.options = {
      width: props.canvas.width,
      height: props.canvas.height
    }
  }
  
  setDrawingMode(setting) {
    this.canvas.isDrawingMode = setting
    //this.canvas.requestRenderAll()
  }

  setTexturePatternBrush = async imgURL => {
    this.context.setActiveObject(null)
    this.canvas.isDrawingMode = true
    let texturePatternBrush : any = new fabric.PatternBrush(this.canvas);
    texturePatternBrush.source = imgURL;
    texturePatternBrush.width = 50;
    this.canvas.freeDrawingBrush = texturePatternBrush
    
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
