import { ObjectType } from '../common/constants'
import exportObject from '../utils/fabricToObject'
import objectToFabric from '../utils/objectToFabric'
import BaseHandler from './BaseHandler'
import { fabric } from 'fabric'

class TemplateHandler extends BaseHandler {
  exportToJSON() {
    // let pathJson : any = new Array();
    // pathJson = CanvasHandler
    // this.objects.forEach(object => {
    //   if (object.type == "path") {
    //     console.log("A PATH!", object)
    //     const test : any = object.toJSON()
    //     console.log(test)
    //     pathJson.push(object.toJSON())
    //   }
    // })
    let drawnPathObjects : fabric.Path[] = this.handlers.canvasHandler.drawnPathObjects
    const canvasJSON: any = this.canvas.toJSON(this.handlers.propertiesToInclude)
    const frameOptions = this.handlers.frameHandler.getOptions()

    var template = {
      name: 'Untitled design',
      objects: [],
      background: {
        type: 'color',
        value: frameOptions.fill ? frameOptions.fill : '#fff'
      },
      frame: {
        width: frameOptions.width,
        height: frameOptions.height
      }
    }
    // fabric.util.enlivenObjects(pathJson, (enlivedPaths: fabric.Object[]) => {
    //     template.objects.push(...enlivedPaths)
    // }, '')
    template.objects.push(...drawnPathObjects)
    var objects = canvasJSON.objects.filter(object => object.type !== ObjectType.FRAME 
      && object.type !== ObjectType.FREE_DRAW)
    objects.forEach(object => {
      if (object.type == "path") {
        console.log("THIS SHOULD NOT BE REACHED BADDDD!!!", object)
      }
      const exportedObject = exportObject.run(object, frameOptions)
      template.objects = template.objects.concat(exportedObject)
    })


    console.log(template.objects)

    return template
  }

  async importFromJSON(template) {
    this.handlers.objectsHandler.clear()
    const frameParams = template.frame
    this.handlers.frameHandler.update(frameParams)

    const frameOptions = this.handlers.frameHandler.getOptions()
    for (const object of template.objects) {
      const element = await objectToFabric.run(object, frameOptions)
      if (element) {
        if (this.config.clipToFrame) {
          const frame = this.handlers.frameHandler.getFrame()
          element.clipPath = frame
        }
        this.canvas.add(element)
      } else {
        console.log('UNABLE TO LOAD OBJECT: ', object)
      }
    }
    this.handlers.frameHandler.setBackgroundColor(
      template.background && template.background.type === 'color' ? template.background.value : '#ffffff'
    )
    this.handlers.historyHandler.save('template:load')
    this.handlers.historyHandler.clear()
    this.handlers.zoomHandler.zoomToFit()
  }
}
export default TemplateHandler
