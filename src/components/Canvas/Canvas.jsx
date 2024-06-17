import {useState} from 'react'
import { Stage, Layer, Rect, Text,  Group, Circle, Line } from 'react-konva';
import { Html } from 'react-konva-utils';

import "./Canvas.css";

export const Canvas = () => {

  const [circles, setCircles] = useState([
    { x: 50, y: 50 },
    { x: 150, y: 150 }
  ]);

  const handleDragMove = (index) => (e) => {
    const newCircles = circles.slice();
    newCircles[index] = {
      x: e.target.x(),
      y: e.target.y()
    };
    setCircles(newCircles);
  };

const handleStageClick = () => {
  console.log(123);
}

  return ( <Stage width={1200} height={600}>
            <Layer>
              <Group draggable x={20} y={50}>
                <Text text="Node 1" fontSize={12} x={0}
                  y={-15}/>
                
                <Rect
                  onClick={handleStageClick} 
                  width={100}
                  height={40}
                  fill="red"
                  shadowBlur={10}
                />
                <Circle x={50} y={0} radius={5} fill="#000" />
                <Circle x={50} y={40} radius={5} fill="#000" />
                <Html divProps={{
                  style: {
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    width: '90px'
                  }
                }}>
                  <input className='my-input'/>
                </Html>
              </Group>
              <Group draggable x={100} y={250}>
                <Text text="Node 1" fontSize={12} x={0}
                  y={-15}/>
                
                <Rect
                  onClick={handleStageClick} 
                  width={100}
                  height={40}
                  fill="red"
                  shadowBlur={10}
                />
                <Circle x={50} y={0} radius={5} fill="#000" />
                <Circle x={50} y={40} radius={5} fill="#000" />
                <Html divProps={{
                  style: {
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    width: '90px'
                  }
                }}>
                  <input className='my-input'/>
                </Html>
              </Group>
              {/* <Line
          points={[circles[0].x, circles[0].y, circles[1].x, circles[1].y]}
          stroke="black"
        /> */}
        {/* <Circle
          draggable
          x={circles[0].x}
          y={circles[0].y}
          radius={5}
          fill="#000"
          onDragMove={handleDragMove(0)}
        /> */}
        {/* <Circle
          draggable
          x={circles[1].x}
          y={circles[1].y}
          radius={5}
          fill="#000"
          onDragMove={handleDragMove(1)}
        /> */}
            </Layer>
          </Stage>);
};
