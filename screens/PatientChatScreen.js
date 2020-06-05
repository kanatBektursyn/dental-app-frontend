import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import {
  GiftedChat,
  InputToolbar,
  BubbleProps,
} from "react-native-gifted-chat";
import { Container } from "../components";
import { messagesApi } from "../utils/api";

const PatientChatScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = () => {
    setIsLoading(true);
    messagesApi
      .get()
      .then(({ data }) => {
        console.log(data);
        setMessages(data.messages);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(function (err) {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(fetchMessages, []);

  useEffect(fetchMessages, [navigation.state.params]);

  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    // example of chat message
    {
      _id: 1,
      text: "Hello!",
      createdAt: new Date().getTime(),
      user: {
        _id: navigation.getParam("state").params.patient._id,
        name: navigation.getParam("state").params.patient.fullname,
      },
    },
  ]);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#fff",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
        }}
      />
    );
  };

  return (
    <ChatContainer>
      <GiftedChat
        renderInputToolbar={(props) => customtInputToolbar(props)}
        messages={messages}
        onSend={(newMessage) => handleSend(newMessage)}
        user={{ _id: 1 }}
      />
    </ChatContainer>
  );
};

const ChatContainer = styled(Container)`
  padding: 0px;
`;

export default PatientChatScreen;
