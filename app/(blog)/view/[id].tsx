import { View, ScrollView, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/Globalprovider";
import { getBlogById, getCompetitionById } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Blog {
  $id: string;
  title: string;
  category: [string];
  content: string;
  imgUrl: string;
}

export default function ViewBlogScreen() {
  const { user } = useGlobalContext();

  if (!user) {
    router.replace("/(auth)/sign-in");
    return null;
  }

  const { id } = useLocalSearchParams() as { id: string };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blog, setBlog] = React.useState<Blog>({
    $id: "",
    title: "",
    category: [""],
    content: "",
    imgUrl: "",
  });

  const getData = async () => {
    setIsLoading(true);
    const documents = await getBlogById(id as string);
    const document = documents[0];
    const data: Blog = {
      $id: document.$id,
      title: document.title,
      category: document.category,
      content: document.content,
      imgUrl: document.imgUrl,
    };

    setBlog(data);
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
        <View className="">
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: blog.imgUrl }}
              resizeMode="cover"
              style={{
                marginTop: 0,
                width: "100%",
                height: 248,
                backgroundColor: "#D1D5DB",
              }}
            />
            <FontAwesome
              name="arrow-left"
              size={18}
              color="#006FFD"
              onPress={() => router.back()}
              style={{
                position: "absolute",
                top: 5,
                left: 16,
                backgroundColor: "rgba(255, 255, 255, 0.88)",
                padding: 8,
                borderRadius: 50,
              }}
            />
          </View>
          <View className="px-4 mt-6">
            <Text className="text-xl font-bold">{blog.title}</Text>
          </View>
          <View className="px-4">
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {blog.category.map((cat, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#006FFD",
                    borderRadius: 50,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>{cat}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className="px-4 mt-8">
            <Text className="text-sm text-gray-600 text-justify">
              {blog.content}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
