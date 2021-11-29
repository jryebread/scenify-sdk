// @ts-nocheck
import * as React from 'react'
import Icons from '../../../icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Slider } from 'baseui/slider'
import { useActiveObject, useEditor } from '../../../../../../../../src'
import { useEffect, useState } from 'react'

function Opacity() {
  const [value, setValue] = useState([30])
  const editor = useEditor()

  useEffect(() => {
    console.log(value)
  }, [])

  const updateOpacity = (value: number[]) => {
    setValue(value)

    const inputValue = value[0]
    editor.setBrushWidth(inputValue)
  }

  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <div
          style={{
            width: '380px',
            background: '#ffffff',
            fontFamily: 'Uber Move Text'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '1.5rem 2rem',
              alignItems: 'center'
            }}
          >
            <div>Brush Width</div>
            <Slider
              overrides={{
                InnerThumb: () => null,
                ThumbValue: () => null,
                TickBar: () => null,
                Thumb: {
                  style: {
                    height: '20px',
                    width: '20px'
                  }
                }
              }}
              min={0}
              max={100}
              marks={false}
              value={value}
              onChange={({ value }) => updateOpacity(value)}
            />
            <div>{Math.round(value[0])}</div>
          </div>
        </div>
      )}
    >
      <Button size={SIZE.default} kind={KIND.tertiary} shape={SHAPE.square}>
        <Icons.Brush size={24} />
      </Button>
    </StatefulPopover>
  )
}

export default Opacity
