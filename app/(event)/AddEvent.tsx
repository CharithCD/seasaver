import { View, Text, ScrollView, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Link } from "expo-router";
import waves from "../../assets/images/wave.jpeg";
import DateField from "@/components/DateField";
import TimeField from "@/components/TimeField";
import TextField from "@/components/TextField";
import SolidButton from "@/components/SolidButton";

export default function AddEventScreen() {
  const [form, setForm] = React.useState({
    eventTitle: "",
    eventType: "",
    description: "",
    date: new Date(),
    time: new Date(),
  });

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView className="-mt-10">
        <Image resizeMode="cover" source={waves} className="mt-0 w-full h-32" />
        <View className="px-6 mt-4">
          <Text className="text-lg font-bold">Fill the form</Text>
          <Text className="mt-2 text-sm text-justify text-gray-500">
            Fill the following form in order to add an Event to the home page
          </Text>

          <View className="border mt-5 p-4 mb-7 border-dashed border-gray-400">
            <TextField
              title="Event Title"
              value={form.eventTitle}
              placeholder="Event Title"
              handleChangeText={(e: string) => {
                setForm({ ...form, eventTitle: e });
              }}
              otherStyles="mt-4"
              keyboardType="default"
            />
            <TextField
              title="Event Type"
              value={form.eventType}
              placeholder="Event Type"
              handleChangeText={(e: string) => {
                setForm({ ...form, eventType: e });
              }}
              otherStyles="mt-4"
              keyboardType="email-address"
            />
            <DateField
              title="Event Date"
              date={form.date}
              handleDateChange={(date: Date) =>
                setForm({ ...form, date: date })
              }
              otherStyles="mt-4"
            />
            <TimeField
              title="Event Time"
              time={form.time}
              handleTimeChange={(time: Date) => setForm({ ...form, time })}
              otherStyles="mt-4"
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
      </ScrollView>
    </SafeAreaView>
  );
}
