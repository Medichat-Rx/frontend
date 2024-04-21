import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";

const UserComplaintScreen = () => {
  const [symptoms, setSymptoms] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [triggerFactors, setTriggerFactors] = useState("");
  const [allergies, setAllergies] = useState("");
  const [generalCondition, setGeneralCondition] = useState("");
  const [validate, setValidate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitComplaint = async () => {
    setValidate("");

    if (
      !symptoms ||
      !timeframe ||
      !medicalHistory ||
      !triggerFactors ||
      !allergies ||
      !generalCondition
    ) {
      if (!symptoms) {
        setValidate("Gejala tidak boleh kosong");
      }
      if (!timeframe) {
        setValidate("Jangka waktu tidak boleh kosong");
      }
      if (!medicalHistory) {
        setValidate("Riwayat penyakit tidak boleh kosong");
      }
      if (!triggerFactors) {
        setValidate("Faktor pemicu tidak boleh kosong");
      }
      if (!allergies) {
        setValidate("Alergi tidak boleh kosong");
      }
      if (!generalCondition) {
        setValidate("Kondisi umum tidak boleh kosong");
      }
    } else {
      setIsLoading(true);
      // Add your API call here
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={tw`p-4 m-4`}>
        {/* <Text style={tw`text-xl text-center font-bold`}>Formulir Keluhan</Text> */}
        {validate && (
          <Text style={tw`text-red-500 text-center`}>{validate}</Text>
        )}
        {/* <Text style={tw`text-sm text-center font-thin`}>
          Isilah sedetail mungkin agar kami bisa membantumu
        </Text> */}
        <Text style={tw`text-lg my-4`}>Apa gejala yang Anda alami?</Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={symptoms}
          onChangeText={setSymptoms}
        />
        <Text style={tw`text-lg my-4`}>
          Sejak kapan Anda merasakan gejala ini?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={timeframe}
          onChangeText={setTimeframe}
        />
        <Text style={tw`text-lg my-4`}>
          Apakah Anda memiliki riwayat penyakit tertentu atau sedang mengonsumsi
          obat lain?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={medicalHistory}
          onChangeText={setMedicalHistory}
        />
        <Text style={tw`text-lg my-4`}>
          Apakah ada faktor pemicu yang mungkin memperburuk kondisi Anda?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={triggerFactors}
          onChangeText={setTriggerFactors}
        />
        <Text style={tw`text-lg my-4`}>
          Apakah Anda memiliki alergi terhadap obat tertentu?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={allergies}
          onChangeText={setAllergies}
        />
        <Text style={tw`text-lg my-4`}>
          Bagaimana perasaan Anda secara umum selain gejala ini?
        </Text>
        <TextInput
          style={tw`h-12 border border-gray-300 rounded-full m-1 pl-7`}
          value={generalCondition}
          onChangeText={setGeneralCondition}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <View style={tw`items-center`}>
            <TouchableOpacity
              style={tw`bg-blue-400 p-3 w-4/5 rounded-md mt-4`}
              onPress={submitComplaint}
            >
              <Text style={tw`text-white font-bold text-center`}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={tw`mb-4`} />
      </View>
    </ScrollView>
  );
};

export default UserComplaintScreen;