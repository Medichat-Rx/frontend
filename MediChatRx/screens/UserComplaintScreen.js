import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";

const UserComplaintScreen = () => {
    const [symptoms, setSymptoms] = useState("");
    const [duration, setDuration] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [triggerFactors, setTriggerFactors] = useState("");
    const [allergies, setAllergies] = useState("");
    const [generalCondition, setGeneralCondition] = useState("");
    const [validate, setValidate] = useState("");

  const submitComplaint = async () => {
    setValidate("");

    if(!symptoms || !duration || !medicalHistory || !triggerFactors || !allergies || !generalCondition){
        if(!symptoms) {
            setValidate("Gejala tidak boleh kosong");
        }
        if(!duration) {
            setValidate("Durasi tidak boleh kosong");
        }
        if(!medicalHistory) {
            setValidate("Riwayat penyakit tidak boleh kosong");
        }
        if(!triggerFactors) {
            setValidate("Faktor pemicu tidak boleh kosong");
        }
        if(!allergies) {
            setValidate("Alergi tidak boleh kosong");
        }
        if(!generalCondition) {
            setValidate("Kondisi umum tidak boleh kosong");
        }
    }
  };

  return (
    <ScrollView>
      <View style={tw`p-4 m-4`}>
        <Text style={tw`text-xl text-center font-bold`}>Formulir Keluhan</Text>
        {validate && <Text style={tw`text-red-500 text-center`}>{validate}</Text>}
        <Text style={tw`text-sm text-center font-thin`}>
          Isilah sedetail mungkin agar kami bisa membantumu
        </Text>
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
          value={duration}
          onChangeText={setDuration}
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
        <Button
          title="Submit"
          onPress={submitComplaint}
          style={tw`bg-blue-500 text-white rounded-full p-2 m-4`}
        />
        <View style={tw`mb-4`} />
      </View>
    </ScrollView>
  );
};

export default UserComplaintScreen;