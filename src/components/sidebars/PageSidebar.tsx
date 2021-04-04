import React, { useState } from "react";
import styled from "styled-components";
import SectionWrapper from "../wrappers/SectionWrapper";
import { BlockPicker } from "react-color";

const PageSidebar: React.FC = () => {
  const [pickerColor, setPickerColor] = useState<string>("#f7941e");

  const handleChangeComplete = (color: { hex: string }) => {
    setPickerColor(color.hex);
  };

  return (
    <Container>
      <SectionWrapper>
        <h2>Circles!</h2>
        <p>pick a color and draw the circles :) :)</p>
        <BlockPicker
          width="208px"
          color={pickerColor}
          onChange={handleChangeComplete}
        />
      </SectionWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 240px;
  position: fixed;
  display: flex;
  text-align: right;
  justify-content: flex-end;
  background-color: #3aafa9;
  top: 0;
  right: 0;
  color: #fff;
  height: inherit;
`;

export default PageSidebar;
