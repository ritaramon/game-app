import React from "react";
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";

const CircleButton: React.FC = styled(PrimaryButton)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export default CircleButton;
