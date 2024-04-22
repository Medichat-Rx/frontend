import { useMutation, useQuery } from "@apollo/client";
import { Chat, defaultTheme } from "@flyerhq/react-native-chat-ui";
import React, { useEffect, useState } from "react";
import { GET_CHAT_MESSAGE } from "../queries/GetChatMessage";
import Loading from "../components/LoadingComponent";
import { SEND_MESSAGE } from "../mutations/SendMessageMutation";
import { View } from "react-native";

// For the testing purposes, you should probably use https://github.com/uuidjs/uuid
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

export default function HomeScreen() {
  const [messages, setMessages] = useState([]);
  const { loading, error, data } = useQuery(GET_CHAT_MESSAGE);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  // const user = { id: "06c33e8b-e835-4736-80f4-63f44b66666c" };

  const UserId = data?.getChatMessage.UserId;
  const user = { id: UserId };

  useEffect(() => {
    if (data) {
      const formattedMessages = data.getChatMessage.message
        .slice()
        .reverse()
        .map((el) => ({
          id: el._id,
          author: el.UserId === UserId ? { id: UserId } : { id: "ChatBot" },
          username: el.username,
          text: el.text,
          type: "text",
          createdAt: Number(el.createdAt),
        }));
      setMessages(formattedMessages);
    }
  }, [data]); // Dependensi useEffect adalah data

  const addMessage = (message) => {
    setMessages([message, ...messages]);
  };

  const handleSendPress = (message) => {
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: "text",
    };
    const textMessageBotTyping = {
      author: "Chatbot",
      createdAt: Date.now(),
      id: uuidv4(),
      text: "......",
      type: "text",
    };
    // addMessage(textMessage);
    setMessages([textMessageBotTyping, textMessage, ...messages]);
    sendMessage({
      variables: {
        newMessage: {
          text: message.text,
        },
      },
    });
  };

  if (loading) {
    console.log("masuk");
    return <Loading />;
  }

  return (
    // Remove this provider if already registered elsewhere
    // or you have React Navigation set up
    <Chat
      theme={{
        ...defaultTheme,
        colors: {
          ...defaultTheme.colors,
          inputBackground: "#6a85e5",
          secondary: "#f5f5f7",
        },
      }}
      l10nOverride={{ inputPlaceholder: "Ada yang bisa kami bantu?" }}
      locale="en"
      // renderCustomMessage={data.getChatMessage.message}
      // renderBubble={renderBubble}
      onMessagePress={console.log("pressed")}
      showUserAvatars="true"
      messages={messages}
      enableAnimation="true"
      onSendPress={handleSendPress}
      user={user}
    />
  );
}
