import { View, ScrollView, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/Globalprovider";
import { getCompetitionById } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Competition {
  $id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imgUrl?: string;
}

export default function ViewCompetitionScreen() {
  const { user } = useGlobalContext();

  if (!user) {
    router.replace("/(auth)/sign-in");
    return null;
  }

  const { id } = useLocalSearchParams() as { id: string };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState<Competition>({
    $id: "",
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    imgUrl: "",
  });

  const getData = async () => {
    setIsLoading(true);
    const documents = await getCompetitionById(id as string);
    const document = documents[0];
    const data: Competition = {
      $id: document.$id,
      title: document.title,
      description: document.description,
      date: document.date,
      time: document.time,
      location: document.location,
      imgUrl: document.imgUrl,
    };
    setForm(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return isLoading ? (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Loading...</Text>
    </View>
  ) : (
    <SafeAreaView>
      <ScrollView>
        <View className="">
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: form.imgUrl }}
              resizeMode="cover"
              style={{
                marginTop: 0,
                width: "100%",
                height: 248,
                backgroundColor: "#D1D5DB",
              }}
            />
            <FontAwesome
              name="arrow-left"
              size={18}
              color="#006FFD"
              onPress={() => router.back()}
              style={{
                position: "absolute",
                top: 5,
                left: 16,
                backgroundColor: "rgba(255, 255, 255, 0.88)",
                padding: 8,
                borderRadius: 50,
              }}
            />
          </View>
          <View className="px-4 mt-6">
            <Text className="text-xl font-bold">{form.title}</Text>
          </View>
          <View className="px-4">
            <Text className="text-base font-semibold text-gray-700">Date: {form.date}</Text>
            <Text className="text-base font-semibold text-gray-700">Location: {form.location}</Text>
          </View>
          <View className="px-4 mt-8">
            <Text className="text-sm text-gray-600 text-justify">{form.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}