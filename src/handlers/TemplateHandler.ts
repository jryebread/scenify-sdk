import { update } from 'lodash'
import { ObjectType } from '../common/constants'
import exportObject from '../utils/fabricToObject'
import objectToFabric from '../utils/objectToFabric'
import BaseHandler from './BaseHandler'

class TemplateHandler extends BaseHandler {
  exportToJSON() {
    const canvasJSON: any = this.canvas.toJSON(this.handlers.propertiesToInclude)
    const frameOptions = this.handlers.frameHandler.getOptions()
    const drawnPathObjects = this.handlers.canvasHandler.drawnPathObjects
    // We just need to extract the exact decimal value of the top,left from path object
    //because for some dang reason toJSON causes the decimal value to drop

    const template = {
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

    const objects = canvasJSON.objects.filter(object => object.type !== ObjectType.FRAME)
    var i : number = 0
    objects.forEach((object) => {
      var updatedObject = object
      if (object.type == "path") {
        // update objects with correct top,left float values
        console.log("pathobjects", drawnPathObjects)
        console.log("PATH!", updatedObject)
        console.log(i)
        updatedObject.top = drawnPathObjects[i].top
        updatedObject.left = drawnPathObjects[i].left
        updatedObject.height = drawnPathObjects[i].height
        updatedObject.width = drawnPathObjects[i].width
        updatedObject.stroke.offsetX = drawnPathObjects[i].stroke.offsetX
        updatedObject.stroke.offsetY = drawnPathObjects[i].stroke.offsetY


        console.log("PATHAFTER!", updatedObject.top)
        i += 1
      }
      const exportedObject = exportObject.run(updatedObject, frameOptions)
      template.objects = template.objects.concat(exportedObject)
      console.log(template.objects)
    })

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
