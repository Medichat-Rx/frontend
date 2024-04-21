const { gql } = require("@apollo/client");

export const GET_CHAT_MESSAGE = gql`
  query GetChatMessage {
    getChatMessage {
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
