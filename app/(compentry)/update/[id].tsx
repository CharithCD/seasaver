import { View, Text, ScrollView, Image, StatusBar, Alert } from "react-native";
import waves from "@/assets/images/wave.jpeg";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import TextField from "@/components/TextField";
import SolidButton from "@/components/SolidButton";
import { useGlobalContext } from "@/context/Globalprovider";
import { getEntryById, getEventById, updateEvent } from "@/lib/appwrite";

interface Entry {
  $id: string;
  user: {
    username: string;
  };
  competition: {
    title: string;
  };
  totItems: number;
  totPoints: number;
  note: string;
  isValid: boolean;
}

export default function UpdateEntryScreen() {
  const { user } = useGlobalContext();

  if (!user) {
    router.replace("/(auth)/sign-in");
    return null;
  }

  const { id } = useLocalSearchParams() as { id: string };

  const [form, setForm] = useState<Entry>({
    $id: "",
    user: {
      username: "",
    },
    competition: {
      title: "",
    },
    totItems: 0,
    totPoints: 0,
    note: "",
    isValid: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = React.useState(false);

  const getData = async () => {
    setIsLoading(true);
    const documents = await getEntryById(id as string);
    const document = documents[0];
    const data: Entry = {
      $id: document.$id,
      user: document.user,
      competition: document.competition,
      totItems: document.totItems,
      totPoints: document.totPoints,
      note: document.note,
      isValid: document.isValid,
    };
    setForm(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const submit = async () => {
    if (
      form.user.username === "" ||
      form.competition.title === "" ||
      form.totItems === 0 ||
      form.totPoints === 0 ||
      form.note === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setSubmitting(true);

    // try {
    //   const updatedEvent = await updateEvent(form);

    //   if (updatedEvent) {
    //     Alert.alert("Success", "Event updated successfully");
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     Alert.alert("Error", error.message);
    //   } else {
    //     Alert.alert("Error", "An unknown error occurred");
    //   }
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return isLoading ? (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Loading...</Text>
    </View>
  ) : (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView className="-mt-10">
        <Image resizeMode="cover" source={waves} className="mt-0 w-full h-32" />
        <View className="px-6 mt-4">
          <View className="border mt-5 p-4 mb-7 border-dashed border-gray-400">
            <TextField
              title="User"
              value={form.user.username}
              placeholder="User"
              handleChangeText={(text) =>
                setForm({ ...form, user: { username: text } })
              }
              editable={false}
            />
            <TextField
              title="Competition"
              value={form.competition.title}
              placeholder="Competition"
              handleChangeText={(text) =>
                setForm({ ...form, competition: { title: text } })
              }
              editable={false}
            />
            <TextField
              title="Total Items"
              value={form?.totItems.toString() || ""}
              placeholder="Total Items"
              handleChangeText={(text) =>
                setForm({ ...form, totItems: parseInt(text) })
              }
            />
            <TextField
              title="Total Points"
              value={form.totPoints.toString()}
              placeholder="Total Points"
              handleChangeText={(text) =>
                setForm({ ...form, totPoints: parseInt(text) })
              }
              editable={false}
            />
            <TextField
              title="Note"
              value={form.note}
              placeholder="Note"
              handleChangeText={(text) => setForm({ ...form, note: text })}
              multiline={true}
              numberOfLines={4}
              editable={false}
            />

            <View className="flex flex-row">
              <View className="flex flex-col w-1/2">
              <SolidButton
                title="Approve"
                handlePress={() => {
                setForm({ ...form, isValid: true });
                submit();
                }}
                containerStyles="mt-6"
                isLoading={isSubmitting}
              />
              </View>
            </View>
            <View className="flex flex-row">
              <View className="flex flex-col w-1/2">
              <SolidButton
                title="Reject"
                handlePress={() => {
                setForm({ ...form, isValid: false });
                submit();
                }}
                containerStyles="mt-6"
                isLoading={isSubmitting}
              />
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
      <StatusBar translucent={true} barStyle={"dark-content"} />
    </SafeAreaView>
  );
}
