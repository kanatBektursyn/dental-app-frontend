import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import {
  HomeScreen,
  PatientScreen,
  AddPatientScreen,
  AddAppointmentScreen,
} from "./screens";

const AppNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: {
        title: "Журнал Записей",
        headerTintColor: "#2a86ff",
        headerStyle: {
          elevation: 0.8,
          shadowOpacity: 0.8,
        },
      },
      screen: HomeScreen,
    },
    Patient: {
      navigationOptions: {
        gestureDirection: "horizontal",
        gestureEnabled: true,
        title: "Карта Пациента",
        headerTintColor: "#2a86ff",
        headerStyle: {
          elevation: 0.8,
          shadowOpacity: 0.8,
        },
      },
      screen: PatientScreen,
    },
    AddPatient: {
      navigationOptions: {
        gestureDirection: "horizontal",
        gestureEnabled: true,
        title: "Добавить Пациента",
        headerTintColor: "#2a86ff",
        headerStyle: {
          elevation: 0.8,
          shadowOpacity: 0.8,
        },
      },
      screen: AddPatientScreen,
    },
    AddAppointment: {
      navigationOptions: {
        gestureDirection: "horizontal",
        gestureEnabled: true,
        title: "Добавить Приём",
        headerTintColor: "#2a86ff",
        headerStyle: {
          elevation: 0.8,
          shadowOpacity: 0.8,
        },
      },
      screen: AddAppointmentScreen,
    },
  },
  { initialRouteName: "Home" }
);

export default createAppContainer(AppNavigator);
