import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($newMessage: NewMessage) {
    sendMessage(newMessage: $newMessage) {
      _id
      UserId
      message {
        _id
        UserId
        username
        text
        createdAt
      }
    }
  }
`;
