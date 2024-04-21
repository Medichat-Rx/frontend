import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";

const UserComplaintScreen = () => {
  const [formData, setFormData] = useState({
    symptoms: "",
    duration: "",
    medicalHistory: "",
    triggerFactors: "",
    allergies: "",
    generalCondition: "",
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const submitComplaint = () => {
    // Handle form submission
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  return (
    <ScrollView>
      <View style={tw`p-4 m-4`}>
        <Text style={tw`text-xl text-center font-bold`}>Formulir Keluhan</Text>
        <Text style={tw`text-sm text-center font-thin`}>
          Isilah sedetail mungkin agar kami bisa membantumu
        </Text>
        <Text style={tw`text-lg my-4`}>Apa gejala yang Anda alami?</Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={formData.symptoms}
          onChangeText={(text) => handleInputChange("symptoms", text)}
        />
        <Text style={tw`text-lg my-4`}>
          Sejak kapan Anda merasakan gejala ini?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={formData.duration}
          onChangeText={(text) => handleInputChange("duration", text)}
        />
        <Text style={tw`text-lg my-4`}>
          Apakah Anda memiliki riwayat penyakit tertentu atau sedang mengonsumsi
          obat lain?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={formData.medicalHistory}
          onChangeText={(text) => handleInputChange("medicalHistory", text)}
        />
        <Text style={tw`text-lg my-4`}>
          Apakah ada faktor pemicu yang mungkin memperburuk kondisi Anda?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={formData.triggerFactors}
          onChangeText={(text) => handleInputChange("triggerFactors", text)}
        />
        <Text style={tw`text-lg my-4`}>
          Apakah Anda memiliki alergi terhadap obat tertentu?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={formData.allergies}
          onChangeText={(text) => handleInputChange("allergies", text)}
        />
        <Text style={tw`text-lg my-4`}>
          Bagaimana perasaan Anda secara umum selain gejala ini?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={formData.generalCondition}
          onChangeText={(text) => handleInputChange("generalCondition", text)}
        />
        <Button
          title="Submit"
          onPress={submitComplaint}
          style={tw`bg-blue-500 text-white rounded-full p-2 m-4`}
          disabled={!isFormValid()}
        />
        <View style={tw`mb-4`} />
      </View>
    </ScrollView>
  );
};

export default UserComplaintScreen;