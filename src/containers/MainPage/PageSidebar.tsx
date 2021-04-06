import React, { useEffect } from "react";
import styled from "styled-components";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { CirclePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setCircleColor, setPainterName } from "../../state/actions";
import { AppState } from "../../state/reducers";
import Input from "../../components/others/Input";
import { pickerColors } from "../../constants/otherConstants";

interface Props {
  visible: boolean;
}

const PageSidebar: React.FC<Props> = ({ visible }) => {
  const dispatch = useDispatch();
  const painterData = useSelector((state: AppState) => state.painterData);

  const handleNameChange = (name: string): void => {
    dispatch(setPainterName(name));
    localStorage.setItem("painterName", name);
  };

  const handleChangeComplete = (color: string): void => {
    dispatch(setCircleColor(color));
    localStorage.setItem("painterColor", color);
  };

  useEffect(() => {
    const painterName = localStorage.getItem("painterName");
    if (painterName) {
      dispatch(setPainterName(painterName));
    }
    const painterColor = localStorage.getItem("painterColor");
    if (painterColor) {
      dispatch(setCircleColor(painterColor));
    }
  }, []);
  return (
    <Container visible={visible}>
      <SectionWrapper>
        <h2>CIRCLES</h2>
        <p>
          Enter your name and <br />
          pick a color!
        </p>
        <Input
          value={painterData.name}
          placeholder="Enter your name"
          maxLength={15}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <ColorPickerContainer>
          <CirclePicker
            color={painterData.color}
            colors={pickerColors}
            width="200px"
            circleSize={32}
            circleSpacing={8}
            onChange={(color) => handleChangeComplete(color.hex)}
          />
        </ColorPickerContainer>
      </SectionWrapper>
    </Container>
  );
};

const Container = styled.div<Props>`
  width: 240px;
  position: fixed;
  display: ${(p) => (p.visible ? "flex" : "none")};
  text-align: right;
  justify-content: flex-end;
  background-color: #3aafa9;
  top: 0;
  right: 0;
  color: #fff;
  height: inherit;
`;

const ColorPickerContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px;
  margin: 8px 0;
`;

export default PageSidebar;
