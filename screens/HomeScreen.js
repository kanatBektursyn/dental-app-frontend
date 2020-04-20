import React, { useState, useEffect } from "react";
import { SectionList, Text } from "react-native";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable-row";
import { Ionicons } from "@expo/vector-icons";

import { Appointment, SectionTitle } from "../components";
import { appointments, patients } from "../utils/api";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    appointments
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      {data && (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Swipeable rightButtons={[<Text>Text1</Text>, <Text>Text2</Text>]}>
              <Appointment navigate={navigation.navigate} item={item} />
            </Swipeable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      )}
      <PlusButton
        style={{
          shadowColor: "2A86FF",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.9,
          shadowRadius: 3.5,
          elevation: 4,
        }}
      >
        <Ionicons name="ios-add" size={36} color="white" />
      </PlusButton>
    </Container>
  );
};

const PlusButton = styled.TouchableOpacity`
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

const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export default HomeScreen;
