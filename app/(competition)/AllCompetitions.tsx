import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import waves from "../../assets/images/wave.jpeg";
import { router } from "expo-router";
import CompetitionListItem from "@/components/CompetitionListItem";

const AllCompetitions = () => {
  const competitions = [
    {
      id: "1",
      title: "Competition 1",
      location: "Location 1",
      date: "Date 1",
      time: "Time 1",
      description: "Description 1",
    },
    {
      id: "2",
      title: "Competition 2",
      location: "Location 2",
      date: "Date 2",
      time: "Time 2",
      description: "Description 2",
    },
    {
      id: "3",
      title: "Competition 3",
      location: "Location 3",
      date: "Date 3",
      time: "Time 3",
      description: "Description 3",
    },
  ];
  return (
    <SafeAreaView className="w-full h-full bg-blue-50">
      <ScrollView className="">
        <Image resizeMode="cover" source={waves} className="mt-0 w-full h-32" />
        <View className="mt-4">
          <View className="flex justify-center items-end p-4">
            <TouchableOpacity
              className="p-2 bg-primary rounded-lg"
              onPress={() => router.push("/")}
            >
              <Text className="text-white">Add Competition</Text>
            </TouchableOpacity>
          </View>

          {competitions.map((competition) => (
            <CompetitionListItem
              key={competition.id}
              competition={competition}
            />
          ))}
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default AllCompetitions;
