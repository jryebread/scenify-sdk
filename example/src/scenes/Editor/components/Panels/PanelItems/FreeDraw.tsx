import * as React from 'react'

import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '../../../../../components/icons'
import { getPixabayImages, PixabayImage } from '../../../../../services/pixabay'
import { useEditor } from '../../../../../../../src'
import { useDebounce } from 'use-debounce'

function FreeDraw() {
    const [search, setSearch] = useState('')
    const [images, setImages] = useState<PixabayImage[]>([])
    const [value] = useDebounce(search, 1000)
    const editor = useEditor()

    // const addImageToCanvas = url => {
    //   const options = {
    //     type: 'StaticImage',
    //     metadata: { src: url }
    //   }
    //   editor.add(options)
    // }

    // set drawing mode true and brush texture to default first image
    useEffect(() => {
     // set default 
     
      getPixabayImages('rock texture')
        .then(data => setImages(data))
        .catch(console.log)
    }, [])
  
    useEffect(() => {
      if (value) {
        getPixabayImages(value)
          .then((data: any) => setImages(data))
          .catch(console.log)
      }
    }, [value])
  
    const setImageBrushTexture = url => {
      const options = {
        type: 'FreeDraw',
        metadata: { src: url },
      }
      editor.setBrushTexture(options)
      editor.deselect()
    }
  
    return (
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 2rem' }}>
          <Input
            startEnhancer={() => <Icons.Search size={18} />}
            value={search}
            onChange={e => setSearch((e.target as any).value)}
            placeholder="Search images"
            clearOnEscape
          />
        </div>
        <div style={{ flex: 1 }}>
          <Scrollbars>
            <div
              style={{ display: 'grid', gap: '0.5rem', padding: '0 2rem 2rem', gridTemplateColumns: '1fr 1fr' }}
            >
              {images.map(img => (
                <div
                  key={img.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => setImageBrushTexture(img.webformatURL)}
                >
                  <img width="100%" src={img.previewURL} alt="preview" />
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>
      </div>
    )
  }
export default FreeDraw
