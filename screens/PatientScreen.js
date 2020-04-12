import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { GrayText, Button, Appointment, Badge } from "../components";
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const PatientScreen = ({ navigation }) => (
  <View style={{ height: "100%" }}>
    <PatientDetails>
      <PatientFullname>{navigation.getParam("user").fullname}</PatientFullname>
      <GrayText>{navigation.getParam("user").phone}</GrayText>
      <PatientButtons>
        <FormulaButtonView>
          <Button>Формула зубов</Button>
        </FormulaButtonView>
        <PhoneButtonView>
          <Button color="#84d269">
            <Foundation name="telephone" size={24} color="white" />
          </Button>
        </PhoneButtonView>
      </PatientButtons>
    </PatientDetails>

    <PatientAppointments>
      <Container>
        <AppointmentCard>
          <MoreButton>
            <MaterialIcons name="unfold-more" size={24} color="#a3a3a3" />
          </MoreButton>
          <AppointmentCardRow>
            <FontAwesome5 name="tooth" size={16} color="#a3a3a3" />
            <AppointmentCardLabel>
              Зуб: <Text style={{ fontWeight: "bold" }}>12</Text>
            </AppointmentCardLabel>
          </AppointmentCardRow>

          <AppointmentCardRow>
            <MaterialIcons name="library-books" size={16} color="#a3a3a3" />
            <AppointmentCardLabel>
              Диагноз: <Text style={{ fontWeight: "bold" }}>пульпит</Text>
            </AppointmentCardLabel>
          </AppointmentCardRow>
          <AppointmentCardRow
            style={{ justifyContent: "space-between", marginTop: 20 }}
          >
            <Badge style={{ width: 185 }} active>
              11.10.2019 - 15:40
            </Badge>
            <Badge color="green">1500$</Badge>
          </AppointmentCardRow>
        </AppointmentCard>
      </Container>
    </PatientAppointments>
  </View>
);
const MoreButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 25px;
  top: 20px;
  height: 32px;
  width: 32px;
`;

const AppointmentCardLabel = styled.Text`
  font-size: 16px;
  margin-left: 7px;
`;

const AppointmentCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3.5px;
  margin-top: 3.5px;
`;

const AppointmentCard = styled.View`
  shadow-color: gray;
  shadow-opacity: 0.9;
  shadow-radius: 10px;
  elevation: 0.6;
  padding: 20px 25px;
  border-radius: 10px;
`;

const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 25px;
  height: 100%;
`;

const PatientDetails = styled(Container)`
  flex: 0.3;
`;

const PatientAppointments = styled.View`
  flex: 1;
  background: #f8fafd;
`;

const FormulaButtonView = styled.View`
  flex: 1;
`;
const PhoneButtonView = styled.View`
  margin-left: 10px;
  width: 45px;
`;

const PatientButtons = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const PatientFullname = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 5px;
`;

export default PatientScreen;
