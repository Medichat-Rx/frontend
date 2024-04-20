import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import * as Location from "expo-location";

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSearch = () => {
    // Implementasikan logika untuk mencari lokasi berdasarkan searchQuery
    // Tetapkan state searchResult dengan lokasi yang ditemukan
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    if (searchQuery !== "") {
      // setLoading(true);
      handleSearch();
    }
  }, [searchQuery]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={tw`flex-1`}>
      <TextInput
        style={tw`h-12 border border-gray-300 rounded-full m-2 pl-7`}
        placeholder="Tentukan lokasimu saat ini..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} color="#0050ff" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        location && location.coords && (
          <MapView
            style={tw`flex-1`}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Lokasi Anda"
              description="Ini adalah lokasi Anda."
            />
          </MapView>
        )
      )}

    </View>
  );
}