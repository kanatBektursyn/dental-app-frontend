import React, { useState, useEffect } from "react";
import DatePicker from "react-native-datepicker";
import { NavigationActions } from "react-navigation";
import { Item, Label, Input, Picker } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";

import { appointments } from "../utils/api";

import { Button, Container } from "../components";

const AddAppointmentScreen = ({ navigation }) => {
  const [values, setValues] = useState({
    diagnosis: "Пульпит",
    dentNumber: null,
    price: "",
    date: null,
    time: null,
    patient: navigation.getParam("patientId"),
  });

  const fieldsLabels = {
    diagnosis: "Диагноз",
    dentNumber: "Номер зуба",
    price: "Цена",
    date: "Дата",
    time: "Время",
  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  };

  const onSubmit = () => {
    appointments
      .add(values)
      .then(() => {
        navigation.navigate("Home", { lastUpdate: new Date() });
      })
      .catch((e) => {
        if (e.response.data && e.response.data.message) {
          e.response.data.message.forEach((err) => {
            const fieldName = err.param;
            alert(`Ошибка! Поле "${fieldsLabels[fieldName]}" указано неверно!`);
          });
        }
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
          onChange={handleInputChange.bind(this, "dentNumber")}
          value={values.dentNumber}
          autoFocus
          style={{ marginTop: 30 }}
          keyboardType="numeric"
        />
      </Item>
      <Item floatingLabel style={{ marginLeft: 0 }}>
        <Label
          style={{
            marginTop: 15,
            marginLeft: 9,
          }}
        >
          Цена
        </Label>
        <Input
          onChange={handleInputChange.bind(this, "price")}
          value={values.price}
          keyboardType="numeric"
          style={{ marginTop: 40 }}
        />
      </Item>
      <Item style={{ marginLeft: 3, marginTop: 25 }}>
        <Picker
          selectedValue={values.diagnosis}
          onValueChange={setFieldValue.bind(this, "diagnosis")}
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
          <Picker.Item label="Пульпит" value="Пульпит" />
          <Picker.Item label="Удаление зуба" value="Удаление зуба" />
          <Picker.Item label="Пломбирование" value="Пломбирование" />
        </Picker>
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
          style={{ flex: 1 }}
          date={values.date}
          mode="date"
          placeholder="Дата"
          format="YYYY-MM-DD"
          minDate={new Date()}
          maxDate="2022-01-01"
          confirmBtnTestID="Сохранить"
          cancelBtnText="Отмена"
          showIcon={false}
          customStyles={{
            dateInput: {
              borderWidth: 0,
            },
            dateText: {
              fontSize: 18,
            },
          }}
          onDateChange={setFieldValue.bind(this, "date")}
        />
        <DatePicker
          style={{ flex: 1 }}
          date={values.time}
          mode="time"
          placeholder="Время"
          format="HH:mm"
          minDate={new Date()}
          maxDate="2022-01-01"
          confirmBtnTestID="Сохранить"
          cancelBtnText="Отмена"
          showIcon={false}
          customStyles={{
            dateInput: {
              borderWidth: 0,
            },
            dateText: {
              fontSize: 18,
            },
          }}
          onDateChange={setFieldValue.bind(this, "time")}
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
