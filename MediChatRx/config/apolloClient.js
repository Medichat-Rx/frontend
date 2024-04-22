import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

// const client = new ApolloClient({
//   uri: "https://32a5-112-215-170-171.ngrok-free.app/",
//   cache: new InMemoryCache(),
// });
const httpLink = createHttpLink({
  uri: "https://f827-180-254-76-192.ngrok-free.app/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("access_token");
  // console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

