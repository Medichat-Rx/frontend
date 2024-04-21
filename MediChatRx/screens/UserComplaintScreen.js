import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
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

const USERCOMP_MUTATION = gql`
  mutation Mutation($newUserComplaint: NewUserComplaint) {
    createUserComplaint(newUserComplaint: $newUserComplaint) {
      _id
      UserId
      symptoms
      symptom_start_time
      medical_history
      triggering_factors
      drug_allergies
      general_feeling
      createdAt
      updatedAt
    }
  }
`;

const UserComplaintScreen = () => {
  const [symptoms, setSymptoms] = useState("");
  const [symptomStartTime, setSymptomStartTime] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [triggerFactors, setTriggerFactors] = useState("");
  const [allergies, setAllergies] = useState("");
  const [generalCondition, setGeneralCondition] = useState("");
  const [validate, setValidate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createUserComplaint] = useMutation(USERCOMP_MUTATION);

  const submitComplaint = async () => {
    setValidate("");

    if (
      !symptoms ||
      !symptomStartTime ||
      !medicalHistory ||
      !triggerFactors ||
      !allergies ||
      !generalCondition
    ) {
      if (!symptoms) {
        setValidate("Gejala tidak boleh kosong");
      }
      if (!symptomStartTime) {
        setValidate("Waktu pertama kali merasakan gejala tidak boleh kosong");
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
    }
    try {
      setIsLoading(true);
      const { data } = await createUserComplaint({
        variables: {
            newUserComplaint: {
              drug_allergies: allergies,
              general_feeling: generalCondition,
              medical_history: medicalHistory,
              symptom_start_time: symptomStartTime,
              symptoms: symptoms,
              triggering_factors: triggerFactors,
            },
        },
      });
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    } finally {
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
          value={symptomStartTime}
          onChangeText={setSymptomStartTime}
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
