import React, { useEffect, useState } from "react";
import {
  getCanvasData,
  addElement,
  CellData,
  getBoardStatus,
} from "../../apis/canvasDataApi";
import { Stage, Layer } from "react-konva";
import CanvasElement from "../../components/others/CanvasElement";
import Konva from "konva";
import { useSelector } from "react-redux";
import { AppState } from "../../state/reducers";

type StageData = {
  stageScale: number;
  stageX: number;
  stageY: number;
};

const CanvasStage: React.FC = () => {
  const pickerColor = useSelector((state: AppState) => state.painterData.color);
  const painterName = useSelector((state: AppState) => state.painterData.name);

  const [stageElements, setStageElements] = useState<CellData[]>([]);
  const [canvasStageData, setCanvasStageData] = useState<StageData>({
    stageScale: 50,
    stageX: 0,
    stageY: 0,
  });
  const [boardVersion, setBoardVersion] = useState<number>(0);

  useEffect(() => {
    trackBoardVersion();
  }, []);

  const trackBoardVersion = () => {
    setTimeout(() => {
      getBoardStatus().then((response) => {
        const newBoardVersion = response[0].update;
        if (newBoardVersion > boardVersion) {
          setBoardVersion(newBoardVersion);
          getCanvasData([
            response[0].minX,
            response[0].minY,
            parseFloat(response[0].maxX),
            parseFloat(response[0].maxY),
          ]).then((response) => {
            setStageElements(response);
          });
        }
        trackBoardVersion();
      });
    }, 1000);
  };

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    if (!painterName || e.evt.button !== 0) return;
    const elementData = {
      x: (e.evt.clientX - canvasStageData.stageX) / canvasStageData.stageScale,
      y: (e.evt.clientY - canvasStageData.stageY) / canvasStageData.stageScale,
      data: {
        name: painterName,
        color: pickerColor,
      },
    };
    setStageElements([...stageElements, elementData]);

    addElement(elementData).then((response) => {
      if (response === 200) {
        setStageElements([...stageElements, elementData]);
      }
    });
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    if (!painterName) return;
    const scaleBy = 1.1;
    const stage = e.target.getStage();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    const pointerPositionX = stage.getPointerPosition().x;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    const pointerPositionY = stage.getPointerPosition().y;
    const oldScale = canvasStageData.stageScale;
    const mousePointTo = {
      x: (pointerPositionX - canvasStageData.stageX) / oldScale,
      y: (pointerPositionY - canvasStageData.stageY) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setCanvasStageData({
      stageScale: newScale,
      stageX: -(mousePointTo.x - pointerPositionX / newScale) * newScale,
      stageY: -(mousePointTo.y - pointerPositionY / newScale) * newScale,
    });
  };

  Konva.dragButtons = [1];

  return (
    <Stage
      draggable={painterName ? true : false}
      opacity={painterName ? 1 : 0.2}
      onClick={handleClick}
      listening={painterName ? true : false}
      width={window.innerWidth}
      height={window.innerHeight}
      onWheel={handleWheel}
      scaleX={canvasStageData.stageScale}
      scaleY={canvasStageData.stageScale}
      x={canvasStageData.stageX}
      y={canvasStageData.stageY}
    >
      <Layer>
        {stageElements.map((element, index) => {
          return <CanvasElement key={index} element={element} />;
        })}
      </Layer>
    </Stage>
  );
};
export default CanvasStage;
