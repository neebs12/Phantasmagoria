import React, { useEffect, useState } from 'react'

const App = (props) => {
  const [generate, setGenerate] = useState(false)
  const circle = {
    cx: props.width / 2,
    cy: props.height / 2,
    level: 0,
    r: 256,
  }

  const NUM_LEVELS = 100
  const generateRandomHex = () => 
    `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`
  const HEX_LEVELS = [...new Array(NUM_LEVELS)].map(_ => generateRandomHex())

  const Circle = (props) => {
    const [localGenerate, setLocalGenerate] = useState(false)
    const mouseOverHandlerLocal = () => {
      if (!localGenerate) { // generates once
        setLocalGenerate(true)
      }
    }

    const localHex = HEX_LEVELS[props.level] // no incrementing here
    console.log(localHex)
    // <circle cx={cx} cy={cy} r={r} onMouseOver={mouseOverHandler} />
    // props already contain the .level, not incremented here, just passed through here
    return (
      <>
        <circle 
          cx={props.cx} 
          cy={props.cy} 
          r={props.r}
          style={{fill: localHex}} 
          onMouseOver={mouseOverHandlerLocal} 
        />
        {localGenerate && GenerateFourCircles({...props})}
      </>
    )
  }

  const GenerateFourCircles = ({cx, cy, r, level}) => {
    const RADIUS_SCALE = 1/2
    const localLevel = level + 1 // increment the level in generate four circles

    console.log('generate!')
    const left = {
      cx: cx - r, cy: cy, r: r * RADIUS_SCALE
    }

    // -- right cicrle is, cx: (cx + r), cy: (cy), r: (r * RADIUS_SCALE)
    const right = {
      cx: cx + r, cy: cy, r: r * RADIUS_SCALE
    }
    // -- top circle is, cx: (cx), cy: (cy + r), r: (r * RADIUS_SCALE)
    const top = {
      cx: cx, cy: cy + r, r: r * RADIUS_SCALE
    }
    // -- bottom cicrle is, cx: (cx), cy: (cy - r), r: (r * RADIUS_SCALE)
    const bottom = {
      cx: cx, cy: cy - r, r: r * RADIUS_SCALE
    }    

    return (
      <>
        <Circle cx={left.cx} cy={left.cy} r={left.r} level={localLevel}/>
        <Circle cx={right.cx} cy={right.cy} r={right.r} level={localLevel}/>
        <Circle cx={top.cx} cy={top.cy} r={top.r} level={localLevel}/>
        <Circle cx={bottom.cx} cy={bottom.cy} r={bottom.r} level={localLevel}/>
      </>
    )
  }

  // note level = 0
  return (
    <>
      <svg width={props.width} height={props.height}>
        <Circle cx={circle.cx} cy={circle.cy} r={circle.r} level={0}/>
        {generate && GenerateFourCircles({...circle})}
      </svg>
    </>
  )
}

export default App
