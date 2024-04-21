// File: GooglePlacesInput.js
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const apiKey = "AIzaSyCnAVbCnjOnFV834XbJ11_fnzrvGd5VB1s"
const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
        key: apiKey,
        language: 'id',
      }}
    />
  );
};

export default GooglePlacesInput;
