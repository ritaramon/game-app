import axios from "axios";
import { apiBaseUrl } from "../constants/apiConstans";

export interface cellData {
  x: number;
  y: number;
  data: cellDataDetails;
}

interface cellDataDetails {
  name: string;
  color: string;
  createdAt: string;
}

export const getData = async (
  path: string,
  boardData: number[]
): Promise<cellData[]> => {
  const apiPath =
    apiBaseUrl +
    path +
    "?x=" +
    boardData[0] +
    "&y=" +
    boardData[1] +
    "&w=" +
    boardData[2] +
    "&h=" +
    boardData[3];
  const request = axios(apiPath, {
    method: "GET",
  });

  return (await request).data;
};
