import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import waves from "../../assets/images/wave.jpeg";
import { router } from "expo-router";
import CompetitionListItem from "@/components/CompetitionListItem";
import { useGlobalContext } from "@/context/Globalprovider";
import { getCompetitions } from "@/lib/appwrite";

interface Competition {
  $id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imgUrl?: string;
}

const AllCompetitions = () => {
  const { user } = useGlobalContext();

  if (user === null) {
    router.replace("/(auth)/sign-in");
    return null;
  }

  const [competition, setCompetition] = useState<Competition[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getData = async () => {
    const documents = await getCompetitions();
    const data: Competition[] = documents.map((doc: any) => ({
      $id: doc.$id,
      title: doc.title,
      description: doc.description,
      date: doc.date,
      time: doc.time,
      location: doc.location,
      imgUrl: doc.imgUrl,
    }));
    setCompetition(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const refetch = async () => getData();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // const competitions = [
  //   {
  //     id: "1",
  //     title: "Competition 1",
  //     location: "Location 1",
  //     date: "Date 1",
  //     time: "Time 1",
  //     description: "Description 1",
  //   },
  //   {
  //     id: "2",
  //     title: "Competition 2",
  //     location: "Location 2",
  //     date: "Date 2",
  //     time: "Time 2",
  //     description: "Description 2",
  //   },
  //   {
  //     id: "3",
  //     title: "Competition 3",
  //     location: "Location 3",
  //     date: "Date 3",
  //     time: "Time 3",
  //     description: "Description 3",
  //   },
  // ];
  return (
    <SafeAreaView className="w-full h-full bg-blue-50">
      <Image resizeMode="cover" source={waves} className="mt-0 w-full h-32" />
      <View className="mt-4">
        <View className="flex justify-center items-end p-4">
          <TouchableOpacity
            className="p-2 bg-primary rounded-lg"
            onPress={() => router.push("/(competition)/AddCompetition")}
          >
            <Text className="text-white">Add Competition</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={competition}
          renderItem={({ item }) => <CompetitionListItem event={item} />}
          keyExtractor={(event) => event.$id}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default AllCompetitions;
