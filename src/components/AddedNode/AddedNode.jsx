import { useSelector, useDispatch } from "react-redux";
import { addNode } from "../../store/nodesReducers";

export const AddedNode = () => {
  const nodes = useSelector((state) => state.nodes.data);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(addNode({
      id: 1,
      title: "Node 111",
      x: 20,
      y: 50,
      value: "123",
      lines: [],
      fill: "green",
    },))
  }

  return (
      <button onClick={onClick} type="button" className="btn btn-success">add node</button>
  );
};
