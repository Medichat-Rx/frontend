import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import * as Location from "expo-location";

const apiKey = "AIzaSyCnAVbCnjOnFV834XbJ11_fnzrvGd5VB1s"

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${searchQuery}&radius=5000&type=hospital&key=${apiKey}`
      );
      const data = await response.json();
      console.log(data.results);
      if (data.results.length > 0) {
        const foundLocations = data.results.map(result => ({
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        }));
        setLocations(foundLocations);
      } else {
        setErrorMsg("No locations found");
      }
    } catch (error) {
      setErrorMsg("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocations([{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }]);
    })();

    if (searchQuery !== "") {
      handleSearch();
    }
  }, [searchQuery]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (locations.length > 0) {
    text = JSON.stringify(locations[0]);
  }

  return (
    <View style={tw`flex-1`}>
      <TextInput
        style={tw`h-12 border border-gray-300 rounded-full m-2 pl-7`}
        placeholder="Cari lokasi Rumah Sakit atau Klinik terdekat..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} color="#0050ff" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        locations.length > 0 && (
          <MapView
            style={tw`flex-1`}
            initialRegion={{
              latitude: locations[0].latitude,
              longitude: locations[0].longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {locations.map((location, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={`Lokasi Anda saat ini`}
                description={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
              />
            ))}
          </MapView>
        )
      )}

    </View>
  );
}
