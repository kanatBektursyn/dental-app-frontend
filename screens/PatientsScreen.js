import React, { useState, useEffect } from "react";
import { FlatList, Alert, View } from "react-native";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable-row";
import { Ionicons } from "@expo/vector-icons";
import { Input, Item } from "native-base";
import phoneFormat from "../utils/phoneFormat";

import {
  Appointment,
  SectionTitle,
  Container,
  PlusButton,
} from "../components";
import { patients } from "../utils/api";

const PatientsScreen = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const fetchPatients = () => {
    setIsLoading(true);
    patients
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

  useEffect(fetchPatients, []);

  useEffect(fetchPatients, [navigation.state.params]);

  const onSearch = (e) => {
    setSearchValue(e.nativeEvent.text);
  };

  const removePatient = (id) => {
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
            patients
              .remove(id)
              .then(() => {
                fetchPatients();
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
        <>
          <View style={{ padding: 20 }}>
            <Item
              style={{
                paddingLeft: 15,
                borderRadius: 10,
              }}
            >
              <Ionicons
                name="md-search"
                size={20}
                color="#8b979f"
                style={{ marginTop: 2 }}
              />
              <Input
                onChange={onSearch}
                placeholderTextColor="#8b979f"
                placeholder="Найти пациента"
              />
            </Item>
          </View>
          <FlatList
            data={data.filter(
              (item) =>
                item.fullname
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) >= 0
            )}
            onRefresh={fetchPatients}
            refreshing={isLoading}
            keyExtractor={(item) => item._id}
            style={{ marginTop: -10 }}
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
                    onPress={removePatient.bind(this, item._id)}
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
                <Appointment
                  navigate={navigation.navigate}
                  item={{
                    patient: item,
                    diagnosis: phoneFormat(item.phone),
                  }}
                />
              </Swipeable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle>{title}</SectionTitle>
            )}
          />
        </>
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

export default PatientsScreen;
