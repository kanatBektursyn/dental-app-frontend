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
        console.log(e.response.data.message);
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
        <Button onPress={onSubmit} color={"#84d269"}>
          <Ionicons name="ios-add" size={28} color="white" />
          <Text style={{ fontSize: 18 }}>Добавить</Text>
        </Button>
      </ButtonView>
    </ContainerReDo>
  );
};

const ContainerReDo = styled(Container)`
  height: 100%;
`;

const ButtonView = styled.View`
  flex: 1;
  margin-top: 40px;
`;

export default AddPatientScreen;
