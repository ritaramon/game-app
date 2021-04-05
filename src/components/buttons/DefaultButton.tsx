import React from "react";
import styled from "styled-components";

const DefaultButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled.button`
  width: 240px;
  height: 48px;
  text-align: center;
  padding: 8px;
  font-size: 12px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #2b7a77;
  color: #ffffff;
  &:hover {
    background-color: #308885;
  }
`;

export default DefaultButton;
