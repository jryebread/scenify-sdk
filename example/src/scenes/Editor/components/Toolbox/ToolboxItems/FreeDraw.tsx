import * as React from 'react'

import Icons from '../../icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import useAppContext from '../../../../../hooks/useAppContext'
import { SubMenuType } from '../../../../../constants/editor'
import Delete from './components/Delete'
import Duplicate from './components/Duplicate'
import Opacity from './components/Opacity'
import Position from './components/Position'

function FreeDraw() {
  const { setActiveSubMenu } = useAppContext()

  return (
    
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      <div>
        <input type="range" name="volume"
              min="0" max="11"/>
        <label>Volume</label>
      </div>  
      <Button
        onClick={() => setActiveSubMenu(SubMenuType.COLOR)}
        size={SIZE.compact}
        kind={KIND.tertiary}
        shape={SHAPE.square}
      >      
  <Icons.FillColor size={24} color="#000000" />
      </Button>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Position />
        <Opacity />
        <Duplicate />
        <Delete />
      </div>
    </div>
  )
}

export default FreeDraw
