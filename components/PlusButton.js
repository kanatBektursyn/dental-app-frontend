import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const PlusButton = ({ onPress }) => (
  <PlusButtonBase
    onPress={onPress}
    style={{
      shadowColor: "#2A86FF",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.9,
      shadowRadius: 3.5,
      elevation: 4,
    }}
  >
    <Ionicons name="ios-add" size={36} color="white" />
  </PlusButtonBase>
);

const PlusButtonBase = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: 64px;
  width: 64px;
  background: #2a86ff;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default PlusButton;
