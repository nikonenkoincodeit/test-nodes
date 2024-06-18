import { useSelector, useDispatch } from "react-redux";
import { addNode } from "../../store/nodesReducers";
import {getRandomColor, getRandomNumber, factory} from '../../helper'
import {CANVAS_WIDTH, CANVAS_HEIGHT, NODE_HEIGHT, NODE_WIDTH} from '../../helper/const.js'

export const AddedNode = () => {
  const nodes = useSelector((state) => state.nodes.data);
  const dispatch = useDispatch();

  const onClick = () => {
    const x = getRandomNumber(0, CANVAS_WIDTH - NODE_WIDTH);
    const y = getRandomNumber(0, CANVAS_HEIGHT - NODE_HEIGHT);
    const fill = getRandomColor()
    const node = factory({
      title: `Node ${nodes.length + 1}`,
      fill,
      x,
      y
    })
   
    dispatch(addNode(node))
  }

  return (
        <button onClick={onClick} type="button" className="btn btn-success" disabled={nodes.length >= 10}>add node</button>
  );
};
