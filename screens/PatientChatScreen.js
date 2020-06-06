import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import {
  GiftedChat,
  InputToolbar,
  BubbleProps,
} from "react-native-gifted-chat";
import { Container } from "../components";
import { messagesApi } from "../utils/api";

const PatientChatScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    setIsLoading(true);
    messagesApi
      .get()
      .then(({ data }) => {
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

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    console.log(newMessage);

    messagesApi
      .add(newMessage)
      .then(() => {
        setMessages(GiftedChat.append(messages, newMessage));
      })
      .catch((e) => {
        alert("Something went wrong");
      });
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#2a86ff" />
      ) : (
        <GiftedChat
          renderInputToolbar={(props) => customtInputToolbar(props)}
          messages={messages}
          onSend={(newMessage) => handleSend(newMessage)}
          user={{ _id: 1 }}
        />
      )}
    </ChatContainer>
  );
};

const ChatContainer = styled(Container)`
  padding: 0px;
`;

export default PatientChatScreen;
