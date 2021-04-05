import React, { useState } from "react";
import styled from "styled-components";
import PageSidebar from "./PageSidebar";
import CircleButton from "../../components/buttons/CircleButton";
import toggleIcon from "../../assets/icons/toggle-icon.png";
import CanvasStage from "./CanvasStage";

interface ButtonProps {
  right: boolean;
}

const MainPage: React.FC = () => {
  const [sidebarVisible, setSidebarVisibility] = useState(true);

  return (
    <>
      <CanvasStage />
      <SidebarButtonContainer right={sidebarVisible}>
        <CircleButton onClick={() => setSidebarVisibility(!sidebarVisible)}>
          <img src={toggleIcon} alt="" />
        </CircleButton>
      </SidebarButtonContainer>
      <PageSidebar visible={sidebarVisible} />
    </>
  );
};

const SidebarButtonContainer = styled.div<ButtonProps>`
  position: absolute;
  right: ${(p) => (p.right ? "214" : "24")}px;
  top: 24px;
  z-index: 1;
`;

export default MainPage;
