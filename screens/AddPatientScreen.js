import React, { useState } from "react";
import { Text } from "react-native";
import { Item, Label, Input, Content } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";

import { patients } from "../utils/api";

import { Button, Container } from "../components";

const AddPatientScreen = ({ navigation }) => {
  const [values, setValues] = useState({});

  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    patients
      .add(values)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((e) => {
        alert("Проверьте параметры");
      });
  };

  return (
    <ContainerReDo>
      <Item floatingLabel last style={{ marginLeft: 0 }}>
        <Label
          style={{
            marginTop: 15,
            marginLeft: -5,
          }}
        >
          Имя и Фамилия
        </Label>
        <Input
          onChange={handleChange.bind(this, "fullname")}
          value={values.fullname}
          autoFocus
          style={{ marginTop: 30 }}
        />
      </Item>
      <Item floatingLabel last style={{ marginLeft: 0 }}>
        <Label
          style={{
            marginTop: 15,
            marginLeft: -5,
          }}
        >
          Номер телефона
        </Label>
        <Input
          onChange={handleChange.bind(this, "phone")}
          value={values.phone}
          dataDetectorTypes="phoneNumber"
          style={{ marginTop: 40 }}
          keyboardType="numeric"
        />
      </Item>
      <ButtonView>
        <Button
          onPress={onSubmit}
          color={"#84d269"}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 3.5,
            elevation: 4,
          }}
        >
          <Ionicons name="ios-add" size={28} color="white" />
          Добавить
        </Button>
      </ButtonView>
    </ContainerReDo>
  );
};

const AddButton = styled(Button)``;

const ContainerReDo = styled(Container)`
  height: 100%;
`;

const ButtonView = styled.View`
  flex: 1;
  margin-top: 40px;
`;

export default AddPatientScreen;
