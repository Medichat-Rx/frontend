import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { CREATE_USERCOMPLAINTS } from "../mutations/CreateUserComplaints";
import LogoutButton from "../components/LogoutButton";

const UserComplaintScreen = ({ navigation }) => {
  const [symptoms, setSymptoms] = useState("");
  const [symptomStartTime, setSymptomStartTime] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [triggerFactors, setTriggerFactors] = useState("");
  const [allergies, setAllergies] = useState("");
  const [generalCondition, setGeneralCondition] = useState("");
  const [validate, setValidate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createUserComplaint, loading, error] = useMutation(
    CREATE_USERCOMPLAINTS
  );

  const submitComplaint = async () => {
    setValidate("");

    if (!symptoms) {
      setValidate("Tolong ceritakan mengenai keluhan apa yang kamu alami");
    }
    if (!symptomStartTime) {
      setValidate("Tolong isi sejak kapan gejala ini mulai dirasakan");
    }
    if (!medicalHistory) {
      setValidate(
        "Tolong isi mengenai riwayat penyakit anda, jika tidak ada anda bisa mengisi 'Tidak ada'"
      );
    }
    if (!triggerFactors) {
      setValidate(
        "Tolong isi mengenai faktor pemicu yang mungkin memperburuk penyakit anda, jika tidak tahu anda bisa mengisi 'tidak tahu'"
      );
    }
    if (!allergies) {
      setValidate(
        "Tolong isi jika anda mempunyai alergi terhadap suatu obat, jika tidak anda dapat mengisi 'Tidak, saya tidak memiliki alergi terhadap obat-obatan.'"
      );
    }
    if (!generalCondition) {
      setValidate(
        "Tolong ceritakan mengenai perasaan anda secara umum selain gejala ini"
      );
    }

    try {
      setIsLoading(true);
      await createUserComplaint({
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
      navigation.navigate("MyDrawer");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={tw`p-4 m-4`}>
        {validate && (
          <Text style={tw`text-red-500 text-center`}>{validate}</Text>
        )}
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

      <LogoutButton />
    </ScrollView>
  );
};

export default UserComplaintScreen;
