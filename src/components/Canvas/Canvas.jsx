import {useState} from 'react'
import { uid } from 'uid';
import { Stage, Layer, Rect, Text,  Group, Circle, Line } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useSelector, useDispatch } from "react-redux";
import { updateValue, updatePositionNode, connectALineToAPoint } from "../../store/nodesReducers";
import {CANVAS_WIDTH, CANVAS_HEIGHT, NODE_HEIGHT, NODE_WIDTH, CIRCLE_RADIUS, CIRCLE_TOP_Y, CIRCLE_TOP_X, CIRCLE_BOTTOM_X, CIRCLE_BOTTOM_Y} from '../../helper/const.js'

import "./Canvas.css";

export const Canvas = () => {
  const nodes = useSelector((state) => state.nodes.data);
  const dispatch = useDispatch();

  const [circles, setCircles] = useState([
    { x: 0, y: 0, id: 0 },
    { x: 0, y: 0, id: 0 }
  ]);

  const [isLine, setIsLine] = useState(false);
  const [lines, setLines] = useState([]);

  const updatePositionLine = (items, lines, x, y, pos) => {
    const arr = lines.map(item => {    
      return item.map(el => {
        if (items.includes(el.id) && el.positionDot === pos) {
          return {...el, x, y}
        }
        return el
      })
    })
    return arr;
  }

  const handleDragMove = (id, node) => (e) => {
    const x = Math.floor(e.target.x())
    const y = Math.floor(e.target.y())
    dispatch(updatePositionNode({id, x, y }))

    let clone = []

    if (node.top.length) {
      clone = updatePositionLine(node.top, lines, x + CIRCLE_TOP_X, y + CIRCLE_TOP_Y, 'top')
    }


    if (node.bottom.length) {
      clone = updatePositionLine(node.bottom, clone, x + CIRCLE_BOTTOM_X, y + CIRCLE_BOTTOM_Y, 'bottom')
    }
  
    if (clone.length) setLines(clone)
   
  }

const onChange = (e) => {
  const {value, name} = e.target;
  const id = name
  dispatch(updateValue({id, value }))
}

const updateArrayData = (index, x, y, parentId = '', positionDot = '') => {
  const arr = [{...circles[0]},{...circles[1]}];
  arr[index].positionDot = positionDot;
  arr[index].parentId = parentId;
  arr[index].id = uid();
  arr[index].x = x;
  arr[index].y = y;
  return arr;
}

const  lineSnap = (parentId, nodeId, position) => {
  dispatch(connectALineToAPoint({id: nodeId, parentId, position  }))
}

const handleDragCanvasMove = (e) => {
  const arr = updateArrayData(0, e.evt.offsetX - 5, e.evt.offsetY )
  setCircles(arr)
}

const onClick = (e) => {
  const {type, elX, elY, parentId, positionDot} = e.target.attrs;
  if (type === 'circle' && !isLine) {
    const arr = updateArrayData(1, elX, elY, parentId, positionDot)
    setCircles(arr)
    setIsLine(true)
    return
  } else if (type === 'circle' && isLine) {
    const node = nodes.find(a => a.id === parentId)
    if (node[positionDot].length >= 3) return

    const arr = updateArrayData(0, circles[0].x, circles[0].y, parentId, positionDot)

    lineSnap(arr[0].parentId, arr[0].id, arr[0].positionDot )
    lineSnap(arr[1].parentId, arr[1].id, arr[1].positionDot )
    const clone = [...lines];
    clone.push(arr)
    setLines(clone)
  }
  setIsLine(false)
}

  return ( <Stage 
              width={CANVAS_WIDTH} 
              height={CANVAS_HEIGHT} 
              onClick={onClick} 
              onMousemove={handleDragCanvasMove}
            >
            <Layer>
            {isLine && <Line
                points={[circles[0].x, circles[0].y, circles[1].x, circles[1].y]}
                stroke="black"
                />}
                {lines.map((items) => (<Line
                style="z-index: 1"
                key={items[0].id}
                points={[items[0].x, items[0].y, items[1].x, items[1].y]}
                stroke="black"
                />))}
            {nodes.map((node) => (
                    <Group 
                      draggable 
                      x={node.x} 
                      y={node.y} 
                      key={node.id} 
                      onDragMove={handleDragMove(node.id, node)}>
                    <Text 
                      text={node.title} 
                      fontSize={12} 
                      x={0}
                      y={-15}/>
                    
                    <Rect
                      style="z-index: 3"
                      width={NODE_WIDTH}
                      height={NODE_HEIGHT}
                      fill={node.fill}
                      shadowBlur={10}
                    />
                    <Circle 
                      id="my-1"
                      parentId={node.id}
                      type="circle"
                      positionDot="top"
                      x={CIRCLE_TOP_X} 
                      y={CIRCLE_TOP_Y} 
                      elX={node.x + CIRCLE_TOP_X}
                      elY={node.y + CIRCLE_TOP_Y}
                      radius={CIRCLE_RADIUS} 
                      fill="#000" 
                      dataId={25}/>
                    <Circle 
                      id="my-2"
                      parentId={node.id}
                      type="circle"
                      positionDot="bottom"
                      x={CIRCLE_BOTTOM_X} 
                      y={CIRCLE_BOTTOM_Y} 
                      elX={node.x + CIRCLE_BOTTOM_X}
                      elY={node.y + CIRCLE_BOTTOM_Y}
                      radius={CIRCLE_RADIUS} 
                      fill="#000" />
                    <Html divProps={{
                      style: {
                        position: 'absolute',
                        top: '5px',
                        left: '5px',
                        width: '90px'
                      }
                    }}>
                      <input className='my-input' type="text" value={node.value} onChange={onChange} name={node.id}/>
                    </Html>
                  </Group>
            ))}
              
              </Layer>
          </Stage>);
};
