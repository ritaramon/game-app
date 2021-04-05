import React, { useState } from "react";
import { Circle, Text, Group } from "react-konva";
import { cellData } from "../../apis/canvasDataApi";

interface Props {
  element: cellData;
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
  const lastCoordXNumber: number = parseInt(
    element.x.toString().charAt(element.x.toString().length - 1)
  );

  return (
    <Group x={element.x} y={element.y}>
      <Text
        align="center"
        text={element.data.name}
        x={-3}
        y={-(1.5 + lastCoordXNumber * 0.5)}
        visible={textVisible}
        fontSize={1.5}
        fontFamily="Roboto"
        fill={element.data.color}
      />
      <Circle
        fill={element.data.color}
        radius={0.5 * lastCoordXNumber}
        opacity={0.7}
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
      />
    </Group>
  );
};

export default CanvasElement;
