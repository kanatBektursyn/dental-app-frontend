import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator, TransitionSpecs } from "react-navigation-stack";
import { fromLeft } from "react-navigation-transitions";

import { HomeScreen, PatientScreen } from "./screens";

const AppNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: {
        title: "Пациенты",
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
  },
  { initialRouteName: "Home" }
);

export default createAppContainer(AppNavigator);
