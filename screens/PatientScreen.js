import React, { useEffect, useState } from "react";
import { Text, FlatList, View, ActivityIndicator, Linking } from "react-native";
import styled from "styled-components/native";
import { GrayText, Button, Badge, PlusButton } from "../components";
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { patients } from "../utils/api";
import phoneFormat from "../utils/phoneFormat";

const PatientScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected]
  );

  useEffect(() => {
    const id = navigation.getParam("patient")._id;
    patients
      .show(id)
      .then(({ data }) => {
        setAppointments(data.data.appointments);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.response);
      });
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <PatientDetails>
        <PatientFullname>
          {navigation.getParam("patient").fullname}
        </PatientFullname>
        <GrayText>{phoneFormat(navigation.getParam("patient").phone)}</GrayText>
        <PatientButtons>
          <FormulaButtonView>
            <Button
              onPress={navigation.navigate.bind(
                this,
                "PatientChatScreen",
                navigation
              )}
            >
              Messages
            </Button>
          </FormulaButtonView>
          <PhoneButtonView>
            <Button
              onPress={() =>
                Linking.openURL(
                  "tel:" + navigation.getParam("patient", {}).phone
                )
              }
              color="#84d269"
            >
              <Foundation name="telephone" size={24} color="white" />
            </Button>
          </PhoneButtonView>
        </PatientButtons>
      </PatientDetails>

      <PatientAppointments>
        <Container>
          {isLoading ? (
            <ActivityIndicator size="large" color="#2a86ff" />
          ) : (
            <FlatList
              data={appointments}
              renderItem={(appointment) => (
                <AppointmentCard
                  key={appointment.item._id}
                  style={{
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderRadius: 10,
                    borderColor: "#f0f0f0",
                  }}
                >
                  <MoreButton>
                    <MaterialIcons
                      name="unfold-more"
                      size={24}
                      color="#a3a3a3"
                    />
                  </MoreButton>
                  <AppointmentCardRow>
                    <FontAwesome5 name="tooth" size={16} color="#a3a3a3" />
                    <AppointmentCardLabel>
                      Зуб:{" "}
                      <Text
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {appointment.item.dentNumber}
                      </Text>
                    </AppointmentCardLabel>
                  </AppointmentCardRow>

                  <AppointmentCardRow>
                    <MaterialIcons
                      name="library-books"
                      size={16}
                      color="#a3a3a3"
                    />
                    <AppointmentCardLabel>
                      Диагноз:{" "}
                      <Text
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {appointment.item.diagnosis}
                      </Text>
                    </AppointmentCardLabel>
                  </AppointmentCardRow>
                  <AppointmentCardRow
                    style={{
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <Badge style={{ width: 185 }} active>
                      {appointment.item.date} - {appointment.item.time}
                    </Badge>
                    <Badge color="green">{appointment.item.price}</Badge>
                  </AppointmentCardRow>
                </AppointmentCard>
              )}
              keyExtractor={(item) => item._id}
              extraData={selected}
            />
          )}
        </Container>
      </PatientAppointments>
      <PlusButton
        onPress={navigation.navigate.bind(this, "AddAppointment", {
          patientId: navigation.getParam("patient", {})._id,
        })}
      />
    </View>
  );
};
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
  padding: 20px 25px;
  border-radius: 10px;
  margin-bottom: 20px;
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
