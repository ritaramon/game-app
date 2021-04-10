import React, { useState } from "react";
import { Circle, Text, Group } from "react-konva";
import { CellData } from "../../apis/canvasDataApi";

interface Props {
  element: CellData;
}

const CanvasElement: React.FC<Props> = ({ element }) => {
  const [textVisible, setTextVisibility] = useState<boolean>(false);

  const handleMouseEnter = (): void => {
    setTextVisibility(true);
  };
  const handleMouseOut = (): void => {
    setTextVisibility(false);
  };
  //used for creation of different size circles
  // const lastCoordXNumber: number = parseInt(
  //   element.x.toString().charAt(element.x.toString().length - 1)
  // );

  return (
    <Group x={element.x} y={element.y}>
      <Text
        text={element.data.name}
        visible={textVisible}
        fontSize={12 / 10}
        x={1 + (element.data.data?.radius ?? 0)}
        fontFamily="Roboto"
        fill={element.data.color}
      />
      <Circle
        fill={element.data.color}
        radius={element.data.data?.radius ?? 1}
        opacity={0.7}
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
      />
    </Group>
  );
};

export default CanvasElement;
