import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Item, Label, Input, Picker, DatePicker } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";

import { patients } from "../utils/api";

import { Button, Container } from "../components";

const AddAppointmentScreen = ({ navigation }) => {
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
      <Item floatingLabel style={{ marginLeft: 0 }}>
        <Label
          style={{
            marginTop: 15,
            marginLeft: 8,
          }}
        >
          Номер зуба
        </Label>
        <Input
          onChange={handleChange.bind(this, "dentNumber")}
          value={values.dentNumber}
          autoFocus
          style={{ marginTop: 30 }}
          keyboardType="numeric"
        />
      </Item>
      <Item style={{ marginLeft: 0, marginTop: 30 }}>
        <Picker
          mode="dialog"
          iosIcon={
            <MaterialIcons
              name="unfold-more"
              style={{ color: "#007aff", fontSize: 25 }}
            />
          }
          placeholder="Выберите Диагноз"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{ width: undefined }}
        >
          <Picker.Item label="Пульпит" value="1" />
          <Picker.Item label="Удаление зуба" value="2" />
          <Picker.Item label="Пломбирование" value="3" />
        </Picker>
      </Item>
      <Item floatingLabel style={{ marginLeft: 0 }}>
        <Label
          style={{
            marginTop: 15,
            marginLeft: 8,
          }}
        >
          Цена
        </Label>
        <Input
          onChange={handleChange.bind(this, "price")}
          value={values.price}
          keyboardType="numeric"
          style={{ marginTop: 40 }}
        />
      </Item>
      <Item
        last
        style={{
          marginLeft: 0,
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <DatePicker
          defaultDate={new Date()}
          minimumDate={new Date()}
          locale={"ru-RU"}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Дата"
          placeHolderTextStyle={{ color: "#000" }}
        />
        <DateTimePicker
          mode="time"
          value={new Date("2020-04-23")}
          is24Hour={true}
          display="default"
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

const TimeRow = styled.View`
  flex-direction: row;
`;

const ContainerReDo = styled(Container)`
  height: 100%;
`;

const ButtonView = styled.View`
  flex: 1;
  margin-top: 40px;
`;

export default AddAppointmentScreen;
