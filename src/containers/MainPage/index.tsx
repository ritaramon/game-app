import { getData, cellData } from "../../apis/canvasDataApi";
import React, { useEffect, useState } from "react";
import { apiPaths } from "../../constants/apiConstans";
import styled from "styled-components";
import PageSidebar from "./PageSidebar";
import CircleButton from "../../components/buttons/CircleButton";
import toggleIcon from "../../assets/icons/toggle-icon.png";
import { Stage, Layer } from "react-konva";
import CanvasElement from "../../components/others/CanvasElement";
import Konva from "konva";
import { AppState } from "../../state/reducers";
import { useSelector } from "react-redux";

interface StageData {
  stageScale: number;
  stageX: number;
  stageY: number;
}

interface ButtonProps {
  right: boolean;
}

const MainPage: React.FC = () => {
  const [stageElements, setStageElements] = useState<cellData[]>([]);
  const [canvasStageData, setCanvasStageData] = useState<StageData>({
    stageScale: 10,
    stageX: 0,
    stageY: 0,
  });
  const pickerColor = useSelector((state: AppState) => state.painterData.color);
  const painterName = useSelector((state: AppState) => state.painterData.name);
  const [sidebarVisible, setSidebarVisibility] = useState(true);

  useEffect(() => {
    getData(apiPaths.getBoard, [0, 0, 100, 100]).then((response) => {
      setStageElements(response);
    });
  }, []);

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!painterName) return;
    const coordinates = {
      x: (e.evt.clientX - canvasStageData.stageX) / canvasStageData.stageScale,
      y: (e.evt.clientY - canvasStageData.stageY) / canvasStageData.stageScale,
      data: {
        name: painterName,
        color: pickerColor,
      },
    };
    setStageElements([...stageElements, coordinates]);
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

  return (
    <>
      <Stage
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

      <ButtonContainer right={sidebarVisible}>
        <CircleButton onClick={() => setSidebarVisibility(!sidebarVisible)}>
          <img src={toggleIcon} alt="" />
        </CircleButton>
      </ButtonContainer>
      <PageSidebar visible={sidebarVisible} />
    </>
  );
};

const ButtonContainer = styled.div<ButtonProps>`
  position: absolute;
  right: ${(p) => (p.right ? "214" : "24")}px;
  top: 24px;
  z-index: 1;
`;

export default MainPage;
