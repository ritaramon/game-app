import { getData, cellData } from "../../apis/Api";
import React, { useEffect, useState } from "react";
import { apiPaths } from "../../constants/apiConstans";
import styled from "styled-components";
import PageSidebar from "../../components/sidebars/PageSidebar";
import CircleButton from "../../components/buttons/CircleButton";
import toggleIcon from "../../assets/icons/toggle-icon.png";
import { Stage, Layer } from "react-konva";
import CanvasElement from "../../components/CanvasElement";
import Konva from "konva";

interface StageData {
  stageScale: number;
  stageX: number;
  stageY: number;
}

const MainPage: React.FC = () => {
  const [stageElements, setStageElements] = useState<cellData[]>([]);
  const [canvasStageData, setCanvasStageData] = useState<StageData>({
    stageScale: 10,
    stageX: 0,
    stageY: 0,
  });
  useEffect(() => {
    getData(apiPaths.getBoard, [0, 0, 200, 200]).then((response) => {
      setStageElements(response);
    });
  }, []);
  const canvasStageRef: React.RefObject<Konva.Stage> = React.createRef();
  // const canvasStageRef: React.RefObject<Konva.Stage> = React.createRef();

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // e.target is a clicked Konva.Shape or current stage if you clicked on empty space
    console.log("clicked on", e);
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
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
      <StageContainer>
        <Stage
          ref={canvasStageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onWheel={handleWheel}
          onClick={handleClick}
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
      </StageContainer>
      <ButtonContainer>
        <CircleButton>
          <img src={toggleIcon} alt="" />
        </CircleButton>
      </ButtonContainer>
      <PageSidebar />
    </>
  );
};

const ButtonContainer = styled.div`
  position: absolute;
  right: 214px;
  top: 24px;
  z-index: 1;
`;

const StageContainer = styled.div`
  background-color: #fff;
`;

export default MainPage;
