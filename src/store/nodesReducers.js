import { createSlice } from "@reduxjs/toolkit";

export const nodesSlice = createSlice({
  name: "counter",
  initialState: {
    data: [
      // {
      //   id: 1,
      //   title: "Node 111",
      //   x: 20,
      //   y: 50,
      //   value: "123",
      //   lines: [],
      //   fill: "green",
      // },
    ],
  },
  reducers: {
    updateValue: (state, action) => {
      state.data = state.data.map((node) => {
        if (node.id.toString() === action.payload.id) {
          return { ...node, value: action.payload.value };
        }
        return node;
      });
    },
    addNode: (state, action) => {
      state.data.push(action.payload);
    },
    // increment: (state, val) => {
    //   console.log("val ", val);
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addNode, updateValue } = nodesSlice.actions;

export default nodesSlice.reducer;
