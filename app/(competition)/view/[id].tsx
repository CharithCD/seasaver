import { View, ScrollView, Image, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import waves from "@/assets/images/wave.jpeg";
import TextField from "@/components/TextField";
import SolidButton from "@/components/SolidButton";
import { useGlobalContext } from "@/context/Globalprovider";
import { getCompetitionById } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";

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
        <View className="p-4">
          <View className="flex-row justify-center items-center">
            <Text className="text-xl font-bold">{form.title}</Text>
          </View>
          <View className="mt-4">
            <Image
              source={{ uri: form.imgUrl }}
              style={{ width: "100%", height: 200 }}
            />
          </View>
          <View className="mt-4">
            <Text className="text-lg font-bold">Description</Text>
            <Text className="text-lg">{form.description}</Text>
          </View>
          <View className="mt-4">
            <Text className="text-lg font-bold">Date</Text>
            <Text className="text-lg">{form.date}</Text>
          </View>
          <View className="mt-4">
            <Text className="text-lg font-bold">Time</Text>
            <Text className="text-lg">{form.time}</Text>
          </View>
          <View className="mt-4">
            <Text className="text-lg font-bold">Location</Text>
            <Text className="text-lg">{form.location}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
