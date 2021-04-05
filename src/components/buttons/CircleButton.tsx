import React from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";

const CircleButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled(DefaultButton)`
  width: 48px;
  border-radius: 50%;
`;

export default CircleButton;
