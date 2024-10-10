import TextField from "@/components/TextField";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CompetitionDashboard = () => {
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
    { id: "6", title: "Item 6" },
  ];

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView>
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
              <Text className="text-white text-base font-semibold">100</Text>
            </View>
            <View className="p-2">
              <Text className="text-white text-base font-semibold ">
                Total Weight:
              </Text>
              <Text className="text-white text-base font-semibold">0.04lb</Text>
            </View>
          </View>
          <View className="flex flex-row justify-between mb-2">
            <View className="p-2">
              <Text className="text-white text-base font-semibold ">Time:</Text>
              <Text className="text-white text-base font-semibold">19:39</Text>
            </View>
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

        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />

        <View className="flex flex-row justify-center mt-6">
          <TouchableOpacity
            className="py-2 px-6 bg-primary rounded-lg mr-2"
            onPress={() => {
              // Logic to scroll left
            }}
          >
            <Text className="text-white">
              <FontAwesome name="arrow-left" size={16} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-2 px-6 bg-primary rounded-lg mr-2"
            onPress={() => {
              // Logic to scroll right
            }}
          >
            <Text className="text-white">
              <FontAwesome name="arrow-right" size={16} color="white" />
            </Text>
          </TouchableOpacity>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  flatList: {
    marginTop: 16,
  },
});

export default CompetitionDashboard;
