import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames'; // Added import for tailwind styles

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    // Implementasikan logika untuk mencari lokasi berdasarkan searchQuery
    // Tetapkan state searchResult dengan lokasi yang ditemukan
  };

  useEffect(() => {
    if (searchQuery !== '') {
      // setLoading(true);
      handleSearch();
    }
  }, [searchQuery]);

  return (
    <View style={tw`flex-1`}>
      <TextInput
        style={tw`h-12 border border-gray-300 rounded-full m-2 pl-7`} // Updated style to use tailwind
        placeholder="Tentukan lokasimu saat ini..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} color="#0050ff" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView style={tw`flex-1`}>
        {searchResult && <Marker coordinate={searchResult} />}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({}); // Removed styles constant as tailwind is used for styling
