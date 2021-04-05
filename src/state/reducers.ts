import { SET_CIRCLE_COLOR, SET_PAINTER_NAME } from "./constants";
import { PainterAction } from "./actions";
import { combineReducers } from "redux";

export type PainterData = {
  name: string;
  color: string;
};

export type AppState = {
  painterData: PainterData;
};

const defaultPainterData: PainterData = { name: "", color: "#f44336" };

const painterData = (
  state = defaultPainterData,
  action: PainterAction
): PainterData => {
  switch (action.type) {
    case SET_CIRCLE_COLOR:
      return { ...state, color: action.value };
    case SET_PAINTER_NAME:
      return { ...state, name: action.value };
    default:
      return state;
  }
};

export const combinedReducer = combineReducers({
  painterData: painterData,
});
