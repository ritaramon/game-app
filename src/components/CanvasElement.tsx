import React, { useState } from "react";
import { Circle, Text, Group } from "react-konva";
import { cellData } from "../apis/Api";

interface Props {
  element: cellData;
}

const CanvasElement: React.FC<Props> = ({ element }) => {
  const [textVisibility, setTextVisibility] = useState<boolean>(false);
  const handleMouseMove = () => {
    setTextVisibility(true);
  };
  const handleMouseOut = () => {
    setTextVisibility(false);
  };
  return (
    <Group x={element.x} y={element.y}>
      <Circle
        fill={element.data.color}
        radius={
          0.5 *
          parseInt(element.x.toString().charAt(element.x.toString().length - 1))
        }
        opacity={0.7}
        onMouseEnter={handleMouseMove}
        onMouseOut={handleMouseOut}
      />
      <Text
        text={element.data.name}
        x={-3}
        y={-2}
        visible={textVisibility}
        fontSize={1.5}
        fontFamily="Roboto"
        color="#2b7a77"
      />
    </Group>
  );
};

export default CanvasElement;
