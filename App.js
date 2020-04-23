import React from "react";
import { TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import {
  HomeScreen,
  PatientScreen,
  AddPatientScreen,
  AddAppointmentScreen,
  PatientsScreen,
} from "./screens";

const AppNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: ({ navigation }) => ({
        title: "Журнал Записей",
        headerTintColor: "#2a86ff",
        headerStyle: {
          elevation: 0.8,
          shadowOpacity: 0.8,
        },
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={navigation.navigate.bind(this, "Patients")}
          >
            <Ionicons name="md-people" size={28} color="#2a86ff" />
          </TouchableOpacity>
        ),
      }),
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
    Patients: {
      navigationOptions: {
        gestureDirection: "horizontal",
        gestureEnabled: true,
        title: "Журнал Пациентов",
        headerTintColor: "#2a86ff",
        headerStyle: {
          elevation: 0.8,
          shadowOpacity: 0.8,
        },
      },
      screen: PatientsScreen,
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
