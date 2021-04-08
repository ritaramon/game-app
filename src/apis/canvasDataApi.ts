import axios from "axios";
import { apiBaseUrl, apiPaths } from "../constants/apiConstans";

export type CellData = {
  x: number;
  y: number;
  data: CellDataRadiusDetails;
};

type CellDataRadiusDetails = {
  circle: {
    name: string;
    radius: number;
  };
  color: string;
  createdAt?: string;
};

type BoardStatusData = {
  update: number;
  minX: number;
  maxX: string;
  minY: number;
  maxY: string;
};

export const getCanvasData = async (
  boardData: number[]
): Promise<CellData[]> => {
  const apiPath = `${apiBaseUrl + apiPaths.getBoard}?x=${boardData[0]}&y=${
    boardData[1]
  }&w=${boardData[2]}&h=${boardData[3]}`;

  const request = axios(apiPath, {
    method: "GET",
  });
  return (await request).data;
};

export const getBoardStatus = async (): Promise<BoardStatusData[]> => {
  const apiPath = apiBaseUrl + apiPaths.getStatus;

  const request = axios(apiPath, {
    method: "GET",
  });
  return (await request).data;
};

export const addElementWithRadius = async (
  elementData: CellData
): Promise<number> => {
  const apiPath = apiBaseUrl + apiPaths.postBoard;

  const request = axios({
    method: "post",
    url: apiPath,
    data: {
      x: elementData.x,
      y: elementData.y,
      name: {
        name: elementData.data.circle.name,
        radius: elementData.data.circle.radius,
      },
      color: elementData.data.color,
    },
  });
  return (await request).status;
};
