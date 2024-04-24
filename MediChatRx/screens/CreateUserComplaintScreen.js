import { gql, useMutation, useQuery } from "@apollo/client";
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
import {
  FontAwesome5,
  Entypo,
  FontAwesome,
  Feather,
  FontAwesome6,
  Fontisto,
} from "@expo/vector-icons";
import { GET_CURRENT_LOG_PROFILE } from "../queries/GetCurrentLogProfile";
import Loading from "../components/LoadingComponent";

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
  const {
    data,
    loading: loading1,
    error: error1,
  } = useQuery(GET_CURRENT_LOG_PROFILE);

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

  if (loading1) {
    return <Loading />;
  }

  return (
    <ScrollView style={tw`bg-white`}>
      <View className="">
        <View style={tw`bg-green-500 p-6 rounded-b-2xl mb-6 shadow-lg`}>
          <Text className="text-2xl font-poppins-bold text-gray-900 mb-4">
            Selamat Datang, {`${data.findCurrentLogUser.name}`}
            <FontAwesome5 name="pagelines" size={24} color="black" />
          </Text>

          <View className="flex flew-row"></View>

          <Text className="text-sm font-poppins-regular text-black">
            Bantu kami mengidentifikasi masalah apa yang sedang kamu alami!
          </Text>
        </View>

        {validate && (
          <Text className="text-red-500 text-center mb-4 font-poppins-bold">
            {validate}
          </Text>
        )}

        <View style={tw`bg-blue-500 text-white rounded-t-2xl mt-6 shadow-lg`}>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold text-white">
              <Entypo name="magnifying-glass" size={24} color="white" />
              Apa gejala yang kamu alami?
            </Text>
            <TextInput
              placeholder="cth: Saya merasa sakit perut dan sering mual."
              placeholderTextColor={"white"}
              className="border-2  border-x-0 text-white border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={symptoms}
              onChangeText={setSymptoms}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold text-white">
              <Feather name="watch" size={24} color="white" />
              Sejak kapan kamu merasakan gejala ini?
            </Text>
            <TextInput
              placeholderTextColor={"white"}
              placeholder="cth: Gejala ini mulai dirasakan sekitar 3 hari yang lalu."
              className=" border-white border-2  text-white border-x-0 rounded-2xl px-6 py-3 font-poppins-regular"
              value={symptomStartTime}
              onChangeText={setSymptomStartTime}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold text-white">
              <FontAwesome name="history" size={24} color="white" />
              Apakah Anda memiliki riwayat penyakit tertentu atau sedang
              mengonsumsi obat lain?
            </Text>
            <TextInput
              placeholderTextColor={"white"}
              placeholder="cth: Saya memiliki riwayat maag dan sedang mengonsumsi obat untuk maag."
              className="border-2  border-x-0 text-white  border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={medicalHistory}
              onChangeText={setMedicalHistory}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold text-white">
              <FontAwesome6 name="code-fork" size={24} color="white" />
              Apakah ada faktor pemicu yang mungkin memperburuk kondisi Anda?
            </Text>
            <TextInput
              placeholderTextColor={"white"}
              placeholder="cth: Saya merasa stres akhir-akhir ini, dan saya juga mungkin salah makan makanan yang tidak cocok."
              className="border-2  border-x-0 text-white  border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={triggerFactors}
              onChangeText={setTriggerFactors}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold text-white">
              <FontAwesome5 name="allergies" size={24} color="white" />
              Apakah Anda memiliki alergi terhadap obat tertentu?
            </Text>
            <TextInput
              placeholderTextColor={"white"}
              placeholder="cth: Tidak, saya tidak memiliki alergi terhadap obat-obatan."
              className="border-2  border-x-0 text-white border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={allergies}
              onChangeText={setAllergies}
            />
          </View>
          <View className="flex gap-4 pt-6 pr-6 pl-6">
            <Text className="text-lg mb-2 font-poppins-bold text-white">
              <Fontisto name="heartbeat-alt" size={24} color="white" />
              Bagaimana perasaan Anda secara umum selain gejala ini?
            </Text>
            <TextInput
              placeholderTextColor={"white"}
              placeholder="cth: Saya merasa lelah dan kurang energi."
              className="border-2  border-x-0 text-white  border-white rounded-2xl px-6 py-3 font-poppins-regular"
              value={generalCondition}
              onChangeText={setGeneralCondition}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#1DA1F2" />
          ) : (
            <TouchableOpacity
              className="bg-green-500 py-3 mt-4 shadow-lg p-6"
              onPress={submitComplaint}
            >
              <Text className="text-white text-lg text-center font-poppins-bold">
                Submit!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <LogoutButton /> */}
    </ScrollView>
  );
};

export default UserComplaintScreen;
