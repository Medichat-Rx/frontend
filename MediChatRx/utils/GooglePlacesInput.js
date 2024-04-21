import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = "AIzaSyCnAVbCnjOnFV834XbJ11_fnzrvGd5VB1s";

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Mencari rumah sakit atau klinik terdekat"
      styles={{
        textInput: {
          height: 40,
          color: 'blue',
          backgroundColor: 'lightgray',
          borderRadius: 20,
        },
      }}
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
        key: apiKey,
        language: "id",
        type: "establishment",
        keyword: "hospital,clinic,rumah sakit, klinik",
      }}
      fetchDetails={false}
    />
  );
};

export default GooglePlacesInput;
