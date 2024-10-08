import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/Globalprovider";
import { router } from "expo-router";
import waves from "../../assets/images/wave.jpeg";
import { StatusBar } from "expo-status-bar";
import EventListItem from "@/components/EventListItem";

const AllEvents = () => {
  const { user } = useGlobalContext();

  if (user === null) {
    router.replace("/(auth)/sign-in");
    return null;
  }

  return (
    <SafeAreaView className="w-full h-full bg-blue-50">
      <ScrollView className="">
        <Image resizeMode="cover" source={waves} className="mt-0 w-full h-32" />
        <EventListItem/>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default AllEvents;
