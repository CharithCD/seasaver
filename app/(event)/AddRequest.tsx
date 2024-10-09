import { View, Text, ScrollView, Image, StatusBar } from "react-native";
import waves from "@/assets/images/wave.jpeg"; // Adjust the path as necessary
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Link } from "expo-router";
import TextField from "@/components/TextField";
import SolidButton from "@/components/SolidButton";

export default function AddRequestScreen() {
  const [form, setForm] = React.useState({
    fullname: "",
    email: "",
    phone: "",
    organization: "",
    description: "",
  });

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView className="-mt-10">
        <Image resizeMode="cover" source={waves} className="mt-0 w-full h-32" />
        <View className="px-6 mt-4">
          <Text className="text-lg font-bold">Fill the form</Text>
          <Text className="mt-2 text-sm text-justify text-gray-500">
            Fill the following form to request an event to be created, One of our
            member will be in touch with you very shortly.
          </Text>

          <View className="border mt-5 p-4 mb-7 border-dashed border-gray-400">
            <TextField
              title="Full Name"
              value={form.fullname}
              placeholder="Full Name"
              handleChangeText={(e: string) => {
                setForm({ ...form, fullname: e });
              }}
              otherStyles="mt-4"
              keyboardType="default"
            />
            <TextField
              title="Email"
              value={form.email}
              placeholder="Email"
              handleChangeText={(e: string) => {
                setForm({ ...form, email: e });
              }}
              otherStyles="mt-4"
              keyboardType="email-address"
            />
            <TextField
              title="Phone"
              value={form.phone}
              placeholder="Phone"
              handleChangeText={(e: string) => {
                setForm({ ...form, phone: e });
              }}
              otherStyles="mt-4"
              keyboardType="phone-pad"
            />
            <TextField
              title="Organization"
              value={form.organization}
              placeholder="Organization"
              handleChangeText={(e: string) => {
                setForm({ ...form, organization: e });
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
            />

            <View className="flex flex-row">
              <View className="flex-1 flex-col">
                <SolidButton
                  title="Submit"
                  handlePress={() => {}}
                  containerStyles="mt-6"
                  isLoading={false}
                />
              </View>
            </View>

          </View>
        </View>
        <StatusBar translucent={true} barStyle={"light-content"}/>
      </ScrollView>
    </SafeAreaView>
  );
}
