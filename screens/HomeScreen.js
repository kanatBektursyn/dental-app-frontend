import React, { useState, useEffect } from "react";
import { SectionList } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import { Appointment, SectionTitle } from "../components";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://trycode.pw/c/HSA4S.json").then(({ data }) => {
      setData(data);
    });
  }, []);

  return (
    <Container>
      {data && (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Appointment navigate={navigation.navigate} item={item} />
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
