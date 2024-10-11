import TextField from "@/components/TextField";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from "@/assets/icons/index";

const CompetitionDashboard = () => {
  // Array of items with default points and click count
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Item 1",
      points: 0,
      clicks: 0,
      image: Icon1,
      pointsPerClick: 3,
    },
    {
      id: 2,
      title: "Item 2",
      points: 0,
      clicks: 0,
      image: Icon2,
      pointsPerClick: 4,
    },
    {
      id: 3,
      title: "Item 3",
      points: 0,
      clicks: 0,
      image: Icon3,
      pointsPerClick: 5,
    },
    {
      id: 4,
      title: "Item 4",
      points: 0,
      clicks: 0,
      image: Icon4,
      pointsPerClick: 6,
    },
    {
      id: 5,
      title: "Item 5",
      points: 0,
      clicks: 0,
      image: Icon5,
      pointsPerClick: 7,
    },
    {
      id: 6,
      title: "Item 6",
      points: 0,
      clicks: 0,
      image: Icon6,
      pointsPerClick: 8,
    },
  ]);

  // Total points state
  const [totalPoints, setTotalPoints] = useState(0);

  // Total clicks state
  const [totalClicks, setTotalClicks] = useState(0);

  // Function to handle touch and update points and clicks
  const handleTouch = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const newPoints = item.points + item.pointsPerClick;
        const newClicks = item.clicks + 1;
        return { ...item, points: newPoints, clicks: newClicks };
      }
      return item;
    });

    // Update state
    setItems(updatedItems);

    // Calculate total points after updating the items
    const newTotalPoints = updatedItems.reduce(
      (acc, item) => acc + item.points,
      0
    );
    setTotalPoints(newTotalPoints);

    // Calculate total clicks after updating the items
    const newTotalClicks = updatedItems.reduce(
      (acc, item) => acc + item.clicks,
      0
    );
    setTotalClicks(newTotalClicks);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-4">
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: "absolute", top: 10, left: 10 }}
            className="p-1 bg-gray-200 rounded-full"
          >
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>
          <View className="p-2 mt-4">
            <Text className="text-xl font-semibold text-center">
              Southern Coast Clean Sweep
            </Text>
          </View>
          <View className="bg-primary p-4 my-6 rounded-2xl">
            <View className="flex flex-row justify-between mb-2">
              <View className="p-2">
                <Text className="text-white text-base font-semibold">
                  No of Items:
                </Text>
                <Text className="text-white text-base font-semibold">
                  {totalClicks}
                </Text>
              </View>
              <View className="p-2">
                <Text className="text-white text-base font-semibold">
                  Total Points:
                </Text>
                <Text className="text-white text-base font-semibold">
                  {totalPoints}
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-between mb-2">
              <View className="p-2">
                <TouchableOpacity
                  className="p-2 bg-blue-300 rounded-lg"
                  onPress={() => {
                    router.push("/(competition)/LeaderBoard");
                  }}
                >
                  <Text className="text-white">Leaderboard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text className="text-base font-semibold text-left px-2">
            Item Categories
          </Text>

          <View className="flex-1 justify-center items-center bg-white rounded-xl shadow-lg shadow-blue-950 p-2 my-4">
            <View className="flex-row flex-wrap justify-between">
              {items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="relative w-1/4 py-2 px-3 bg-blue-100 m-2 rounded-full"
                  onPress={() => handleTouch(item.id)}
                >
                  <Image source={item.image} className="w-14 h-14" />

                  {/* Bubble showing the number of clicks */}
                  <View className="absolute top-0 right-0 bg-blue-500 w-6 h-6 rounded-full justify-center items-center">
                    <Text className="text-white text-xs">{item.clicks}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="flex mt-12">
            <TextField
              otherStyles="mt-0"
              placeholder="Add a note"
              multiline={true}
              numberOfLines={4}
              title="Additional Note"
              value={""}
              handleChangeText={() => {}}
            />
            <TouchableOpacity
              className="flex justify-center items-center mt-4 bg-primary py-2 rounded-xl"
              onPress={() => {
                console.log("Submit");
              }}
            >
              <Text className="text-lg font-bold text-white">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompetitionDashboard;
