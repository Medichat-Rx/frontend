import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = "AIzaSyCnAVbCnjOnFV834XbJ11_fnzrvGd5VB1s";

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Mencari rumah sakit atau klinik terdekat"
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
        key: apiKey,
        language: "id",
        type: "establishment",
        keyword: "hospital,clinic", // Fokus pencarian pada rumah sakit dan klinik
      }}
      fetchDetails={false}
    />
  );
};

export default GooglePlacesInput;
