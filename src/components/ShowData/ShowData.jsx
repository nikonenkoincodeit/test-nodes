import { useSelector } from "react-redux";

export const ShowData = () => {
  const nodes = useSelector((state) => state.nodes.data);

  const onClick = () => {
    try {
      console.log(JSON.stringify(nodes));
    } catch ({ message }) {
      console.log(message);
    }
  };

  return (
    <button onClick={onClick} type="button" className="btn btn-primary">
      Show data
    </button>
  );
};
