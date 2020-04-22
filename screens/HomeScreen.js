import React, { useState, useEffect } from "react";
import { SectionList, Alert } from "react-native";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable-row";
import { Ionicons } from "@expo/vector-icons";

import {
  Appointment,
  SectionTitle,
  Container,
  PlusButton,
} from "../components";
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

  const removeAppointment = (id) => {
    Alert.alert(
      "Удаление приёма",
      "Вы уверены в удалении?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            setIsLoading(true);
            appointments
              .remove(id)
              .then(() => {
                fetchAppointments();
              })
              .catch((e) => alert(e.response));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <HomeContainer>
      {data && (
        <SectionList
          sections={data}
          onRefresh={fetchAppointments}
          refreshing={isLoading}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Swipeable
              rightButtonWidth={80}
              rightButtons={[
                <SwipeViewButton style={{ backgroundColor: "#b4c1cb" }}>
                  <Ionicons
                    style={{ marginLeft: 28 }}
                    name="md-create"
                    size={28}
                    color="white"
                  />
                </SwipeViewButton>,
                <SwipeViewButton
                  style={{ backgroundColor: "#f85a5a" }}
                  onPress={removeAppointment.bind(this, item._id)}
                >
                  <Ionicons
                    style={{ marginLeft: 30 }}
                    name="ios-close"
                    size={50}
                    color="white"
                  />
                </SwipeViewButton>,
              ]}
            >
              <Appointment navigate={navigation.navigate} item={item} />
            </Swipeable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      )}
      <PlusButton onPress={navigation.navigate.bind(this, "AddPatient")} />
    </HomeContainer>
  );
};

const SwipeViewButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;

const HomeContainer = styled(Container)`
  padding: 0px;
`;

export default HomeScreen;
