import * as React from 'react'
import Icons from '../../icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import useAppContext from '../../../../../hooks/useAppContext'
import { PanelType } from '../../../../../constants/app-options'
import BrushWidth from './components/BrushWidth'
function Default() {
  const { setActivePanel } = useAppContext()


  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem'
      }}
    >
            <Button
        onClick={() => setActivePanel(PanelType.BACKGROUND)}
        size={SIZE.compact}
        kind={KIND.tertiary}
        shape={SHAPE.square}
      >
        <Icons.FillColor size={24} color="#000000" />
      </Button>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BrushWidth />
      </div>
    </div>
  )
}

export default Default
