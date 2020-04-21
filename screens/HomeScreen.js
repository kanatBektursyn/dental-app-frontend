import React, { useState, useEffect } from "react";
import { SectionList, Text } from "react-native";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable-row";
import { Ionicons } from "@expo/vector-icons";

import { Appointment, SectionTitle, Container } from "../components";
import { appointments } from "../utils/api";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchAppointments = () => {
    setIsLoading(true);
    appointments
      .get()
      .then(({ data }) => {
        setData(data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(function (err) {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(fetchAppointments, []);

  return (
    <HomeContainer>
      {data && (
        <SectionList
          sections={data}
          onRefresh={fetchAppointments}
          refreshing={isLoading}
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
        onPress={navigation.navigate.bind(this, "AddPatient")}
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
    </HomeContainer>
  );
};

const HomeContainer = styled(Container)`
  padding: 0px;
`;

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

export default HomeScreen;
