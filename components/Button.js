import React from "react";
import styled from "styled-components/native";

const ButtonBase = ({ children, color }) => (
  <Button color={color}>
    <ButtonText>{children}</ButtonText>
  </Button>
);

ButtonBase.defaultProps = { color: "#2a86ff" };

const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${(props) => props.color};
  text-align: center;
  height: 45px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 16px;
`;

export default ButtonBase;
