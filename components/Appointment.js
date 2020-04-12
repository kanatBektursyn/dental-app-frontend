import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import GrayText from "./GrayText";
import Badge from "./Badge";

const Appointment = ({ navigate, item }) => {
  const { user, diagnosis, active, time } = item;
  return (
    <GroupItem onPress={navigate.bind(this, "Patient", item)}>
      <Avatar source={{ uri: user.avatar }} />
      <View style={{ flex: 1 }}>
        <FullName>{user.fullname}</FullName>
        <GrayText>{diagnosis}</GrayText>
      </View>
      <Badge active={active}>{time}</Badge>
    </GroupItem>
  );
};

Appointment.defaultProps = {
  title: "Untitled",
  items: [],
};

const FullName = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 12px;
`;

const GroupItem = styled.TouchableOpacity`
  opacity: 10;
  align-items: center;
  flex-direction: row;
  padding: 20px 20px 15px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

export default Appointment;
