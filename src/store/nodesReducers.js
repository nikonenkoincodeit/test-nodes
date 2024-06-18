import { createSlice } from "@reduxjs/toolkit";

export const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    data: [],
  },
  reducers: {
    updateValue: (state, action) => {
      state.data = state.data.map((node) => {
        if (node.id === action.payload.id) {
          return { ...node, value: action.payload.value };
        }
        return node;
      });
    },
    updatePositionNode: (state, action) => {
      state.data = state.data.map((node) => {
        if (node.id === action.payload.id) {
          return { ...node, x: action.payload.x, y: action.payload.y };
        }
        return node;
      });
    },
    connectALineToAPoint: (state, action) => {
      state.data = state.data.map((node) => {
        if (node.id === action.payload.parentId) {
          return {
            ...node,
            [action.payload.position]: [
              ...node[action.payload.position],
              action.payload.id,
            ],
          };
        }
        return node;
      });
    },
    addNode: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const {
  addNode,
  updateValue,
  updatePositionNode,
  connectALineToAPoint,
} = nodesSlice.actions;

export default nodesSlice.reducer;
