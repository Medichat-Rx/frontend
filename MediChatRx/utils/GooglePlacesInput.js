import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = "AIzaSyCnAVbCnjOnFV834XbJ11_fnzrvGd5VB1s";

const GooglePlacesInput = () => {
  return (
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
        keyword: ["hospital", "health", "point_of_interest", "establishment"],
        radius: 3000,
        location: `${location.latitude},${location.longitude}`,
      }}
      fetchDetails={true}
    />
  );
};

export default GooglePlacesInput;
