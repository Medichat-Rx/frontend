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
import LogoutButton from "../components/LogoutButton";
import { UPDATE_USERCOMPLAINTS } from "../mutations/UpdateUserComplaints";
import {
  FontAwesome5,
  Entypo,
  FontAwesome,
  Feather,
  FontAwesome6,
  Fontisto,
} from "@expo/vector-icons";

const UserComplaintScreen = ({ navigation }) => {
  const [symptoms, setSymptoms] = useState("");
  const [symptomStartTime, setSymptomStartTime] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [triggerFactors, setTriggerFactors] = useState("");
  const [allergies, setAllergies] = useState("");
  const [generalCondition, setGeneralCondition] = useState("");
  const [validate, setValidate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [updateUserComplaints, loading, error] = useMutation(
    UPDATE_USERCOMPLAINTS
  );

  const submitComplaint = async () => {
    setValidate("");

    if (!symptoms) {
      setValidate("Tolong ceritakan mengenai keluhan apa yang kamu alami");
      return
    }
    if (!symptomStartTime) {
      setValidate("Tolong isi sejak kapan gejala ini mulai dirasakan");
      return
    }
    if (!medicalHistory) {
      setValidate(
        "Tolong isi mengenai riwayat penyakit anda, jika tidak ada anda bisa mengisi 'Tidak ada'"
      );
      return
    }
    if (!triggerFactors) {
      setValidate(
        "Tolong isi mengenai faktor pemicu yang mungkin memperburuk penyakit anda, jika tidak tahu anda bisa mengisi 'tidak tahu'"
      );
      return
    }
    if (!allergies) {
      setValidate(
        "Tolong isi jika anda mempunyai alergi terhadap suatu obat, jika tidak anda dapat mengisi 'Tidak, saya tidak memiliki alergi terhadap obat-obatan.'"
      );
      return
    }
    if (!generalCondition) {
      setValidate(
        "Tolong ceritakan mengenai perasaan anda secara umum selain gejala ini"
      );
      return
    }

    try {
      setIsLoading(true);
      await updateUserComplaints({
        variables: {
          updateUserComplaint: {
            drug_allergies: allergies,
            general_feeling: generalCondition,
            medical_history: medicalHistory,
            symptom_start_time: symptomStartTime,
            symptoms: symptoms,
            triggering_factors: triggerFactors,
          },
        },
      });
      navigation.navigate("Chat");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={tw`bg-white`}>
      <View className="">
        <View style={tw`bg-blue-400 p-6 rounded-b-2xl mb-6`}>
          <Text className="text-2xl font-poppins-bold text-white mb-4 flex">
            Kamu memiliki keluhan baru? Yuk update
            <FontAwesome5 name="pagelines" size={24} color="white" />
          </Text>
          <Text className="text-sm font-poppins-regular text-white">
            Bantu kami mengidentifikasi masalah apa yang sedang kamu alami!
          </Text>
        </View>

        {validate && (
          <Text className="text-red-500 text-center mb-4 font-poppins-bold">
            {validate}
          </Text>
        )}

        <View className=" bg-green-400 text-white rounded-t-2xl mt-6">
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold">
              <Entypo name="magnifying-glass" size={24} color="black" />
              Apa gejala yang kamu alami?
            </Text>
            <TextInput
              placeholder="cth: Saya merasa sakit perut dan sering mual."
              className="border border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={symptoms}
              onChangeText={setSymptoms}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold">
              <Feather name="watch" size={24} color="black" />
              Sejak kapan kamu merasakan gejala ini?
            </Text>
            <TextInput
              placeholder="cth: Gejala ini mulai dirasakan sekitar 3 hari yang lalu."
              className="border border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={symptomStartTime}
              onChangeText={setSymptomStartTime}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold">
              <FontAwesome name="history" size={24} color="black" />
              Apakah Anda memiliki riwayat penyakit tertentu atau sedang
              mengonsumsi obat lain?
            </Text>
            <TextInput
              placeholder="cth: Saya memiliki riwayat maag dan sedang mengonsumsi obat untuk maag."
              className="border border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={medicalHistory}
              onChangeText={setMedicalHistory}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold">
              <FontAwesome6 name="code-fork" size={24} color="black" />
              Apakah ada faktor pemicu yang mungkin memperburuk kondisi Anda?
            </Text>
            <TextInput
              placeholder="cth: Saya merasa stres akhir-akhir ini, dan saya juga mungkin salah makan makanan yang tidak cocok."
              className="border border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={triggerFactors}
              onChangeText={setTriggerFactors}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold">
              <FontAwesome5 name="allergies" size={24} color="black" />
              Apakah Anda memiliki alergi terhadap obat tertentu?
            </Text>
            <TextInput
              placeholder="cth: Tidak, saya tidak memiliki alergi terhadap obat-obatan."
              className="border border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={allergies}
              onChangeText={setAllergies}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold">
              <Fontisto name="heartbeat-alt" size={24} color="black" />
              Bagaimana perasaan Anda secara umum selain gejala ini?
            </Text>
            <TextInput
              placeholder="cth: Saya merasa lelah dan kurang energi."
              className="border border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={generalCondition}
              onChangeText={setGeneralCondition}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#1DA1F2" />
          ) : (
            <TouchableOpacity
              className="bg-blue-500 py-3 mt-4 shadow-lg p-6"
              onPress={submitComplaint}
            >
              <Text className="text-white text-lg text-center font-poppins-bold">
                Perbarui Keluhanmu!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserComplaintScreen;
