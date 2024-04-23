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
  const [selectedPlaces, setSelectedPlaces] = useState([]);

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
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=rumah+sakit|klinik&location=${location.coords.latitude},${location.coords.longitude}&radius=2000&key=${apiKey}`);
        // console.log(response.data.results)
        if (response.data.results.length > 0) {
          const hospitals = response.data.results.filter(place => place.types.includes('hospital') && place.types.includes('health') && !place.name.includes("ojek") && !place.name.includes("makan") && !place.name.includes("Restoran") && !place.name.includes("Barber"))
          // .slice(0, 3);
          const clinics = response.data.results.filter(place => place.name.includes('Klinik') || place.name.includes('klinik') || place.name.includes('Rumah Sehat') || place.name.includes('Terapi'))
          // .slice(0, 3);
          setSelectedPlaces([...hospitals, ...clinics]);
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
            description={`${location.latitude}, ${location.longitude}`}
          />
          {selectedPlaces.map((place, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              title={place.name}
              description={place.vicinity}
              pinColor={place.name.includes('klinik') || place.name.includes('Klinik') || place.name.includes('Rumah Sehat') || place.name.includes('Terapi') ? "#01593c" : "#013c3e"}
              // icon={"🏥"}
            />
          ))}
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


