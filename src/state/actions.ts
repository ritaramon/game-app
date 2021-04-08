import {
  SET_CIRCLE_COLOR,
  SET_PAINTER_NAME,
  SET_CIRCLE_RADIUS,
} from "./constants";

export type PainterAction = {
  type: string;
  value: string;
};

export const setCircleColor = (value: string): PainterAction => {
  return {
    type: SET_CIRCLE_COLOR,
    value,
  };
};

export const setPainterName = (value: string): PainterAction => {
  return {
    type: SET_PAINTER_NAME,
    value,
  };
};

export const setCircleRadius = (value: string): PainterAction => {
  return {
    type: SET_CIRCLE_RADIUS,
    value,
  };
};
