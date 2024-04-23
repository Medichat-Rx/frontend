import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from 'axios';
import GooglePlacesInput from "../utils/GooglePlacesInput";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = "AIzaSyCnAVbCnjOnFV834XbJ11_fnzrvGd5VB1s"

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      // Axios
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=rumah+sakit&location=${location.coords.latitude},${location.coords.longitude}&radius=5000&type=hospital|health|point_of_interest|establishment&key=${apiKey}`);
        if (response.data.results.length > 0) {
          const firstResult = response.data.results[0];
          setSelectedPlace({
            name: firstResult.name,
            geometry: { location: firstResult.geometry.location }
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();

  }, []);

  return (
    <View style={{ flex: 3 }}>
      {location ? (
        <MapView
          style={{ flex: 3 }}
          region={location}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Lokasimu saat ini"
          />
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.geometry.location.lat,
                longitude: selectedPlace.geometry.location.lng,
              }}
              title={selectedPlace.name}
            />
          )}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      {/* {location && 
      <GooglePlacesAutocomplete
        placeholder="Mencari rumah sakit atau klinik terdekat"
        styles={{
          textInput: {
            height: 50,
            color: "blue",
            backgroundColor: "lightgray",
            borderRadius: 20,
          },
        }}
        // onPress={handlePlaceSelect}
        query={{
          key: "AIzaSyCnAVbCnjOnFV834XbJ11_fnzrvGd5VB1s",
          language: "id",
          type: "establishment",
          keyword: [ "hospital", "health", "point_of_interest", "establishment"],
          radius: 3000,
          location: `${location.latitude},${location.longitude}`,
        }}
        fetchDetails={true}
      />
      } */}
    </View>
  );
};

export default MapScreen;