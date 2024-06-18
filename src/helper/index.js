import { uid } from "uid";

export const getRandomColor = () => {
  const randomNumber = Math.floor(Math.random() * 16777215);
  return `#${randomNumber.toString(16).padStart(6, "0")}`;
};

export const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const factory = ({ title = "", x = 0, y = 0, fill = "" } = {}) => {
  return {
    id: uid(),
    x,
    y,
    fill,
    title,
    value: "",
    top: [],
    bottom: [],
  };
};
