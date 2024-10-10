import { View, Text, ScrollView, Image, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import waves from "../../assets/images/wave.jpeg";
import TextField from "@/components/TextField";
import SolidButton from "@/components/SolidButton";
import { addCompetition } from "@/lib/appwrite";

export default function AddCompetitionScreen() {
  const [isSubmitting, setSubmitting] = React.useState(false);

  const [form, setForm] = React.useState({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    imgUrl: "",
  });

  const submit = async () => {
    if (
      form.title === "" ||
      form.location === "" ||
      form.date === "" ||
      form.time === "" ||
      form.description === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setSubmitting(true);

    try {
      const newCompetition = await addCompetition(form);

      if (newCompetition) {
        Alert.alert("Success", "Competition added successfully");

        setForm({
          title: "",
          location: "",
          date: "",
          time: "",
          description: "",
          imgUrl: "",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView className="">
        <Image resizeMode="cover" source={waves} className="mt-0 w-full h-32" />
        <View className="px-6 mt-4">
          <Text className="text-lg font-bold">Fill the form</Text>
          <Text className="mt-2 text-sm text-justify text-gray-500">
            Fill the following form in order to add a Competition to the home
            page
          </Text>

          <View className="border mt-5 p-4 mb-7 border-dashed border-gray-400">
            <TextField
              title="Competition Title"
              value={form.title}
              placeholder="Competition Title"
              handleChangeText={(e: string) => {
                setForm({ ...form, title: e });
              }}
              otherStyles="mt-4"
              keyboardType="default"
            />
            <TextField
              title="Location"
              value={form.location}
              placeholder="Location"
              handleChangeText={(e: string) => {
                setForm({ ...form, location: e });
              }}
              otherStyles="mt-4"
              keyboardType="default"
            />

            <TextField
              title="Date"
              value={form.date}
              placeholder="Date"
              handleChangeText={(e: string) => {
                setForm({ ...form, date: e });
              }}
              otherStyles="mt-4"
              keyboardType="default"
            />

            <TextField
              title="Time"
              value={form.time}
              placeholder="Time"
              handleChangeText={(e: string) => {
                setForm({ ...form, time: e });
              }}
              otherStyles="mt-4"
              keyboardType="default"
            />

            <TextField
              title="Description"
              value={form.description}
              placeholder="Description"
              handleChangeText={(e: string) => {
                setForm({ ...form, description: e });
              }}
              otherStyles="mt-4"
              keyboardType="default"
              multiline={true}
              numberOfLines={4}
            />
            <TextField
              title="Image URL"
              value={form.imgUrl}
              placeholder="Image URL"
              handleChangeText={(e: string) => {
                setForm({ ...form, imgUrl: e });
              }}
              otherStyles="mt-4"
              keyboardType="default"
            />
            <View className="flex flex-row">
              <View className="flex-1 flex-col">
                <SolidButton
                  title="Submit"
                  handlePress={() => {
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
    </SafeAreaView>
  );
}
