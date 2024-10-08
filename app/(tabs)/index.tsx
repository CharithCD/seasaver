import { useGlobalContext } from "@/context/Globalprovider";
import { Link, Redirect, router } from "expo-router";
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    title: "First Item",
    imageUrl:
      "https://20811975.fs1.hubspotusercontent-na1.net/hubfs/20811975/Imported_Blog_Media/Screen-Shot-2020-07-10-at-3_01_36-PM-3511-1594418610-2.png",
  },
  {
    id: "2",
    title: "Second Item",
    imageUrl:
      "https://cdn.vectorstock.com/i/500p/60/81/beach-clean-up-concept-vector-49556081.jpg",
  },
  {
    id: "3",
    title: "Third Item",
    imageUrl:
      "https://images.encounteredu.com/excited-hare/production/uploads/Top-ten-items-international-coastal-cleanup-2020.jpg?w=1200&h=800&q=80&auto=format&fit=clip&dm=1631569439&s=6d6e955b2b8c14a97a33bfa8558bab86",
  },
  {
    id: "4",
    title: "Fourth Item",
    imageUrl:
      "https://www.wastemanaged.co.uk/wp-content/uploads/2024/03/Beach-Litter.webp",
  },
];

interface ItemProps {
  title: string;
  imageUrl: string;
}

const Item = ({ title, imageUrl }: ItemProps) => (
  <View className="m-2 rounded-md">
    <Image
      source={{ uri: imageUrl }}
      style={{ width: width * 0.8, height: 160 }}
      className="rounded-lg"
      accessibilityLabel={title}
    />
  </View>
);

export default function HomeScreen() {
  const { user } = useGlobalContext();

  if (!user) {
    router.replace("/(auth)/sign-in");
    return null;
  }

  return (
    <SafeAreaView className="w-full h-full p-4 bg-blue-50">
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={[1]} // Dummy data to create a single item for header
        renderItem={() => (
          <View>
            <View className="bg-white h-fit rounded-md p-2">
              <Text className="text-[24px] font-semibold "> Welcome Back,</Text>
              {user && <Text className="ml-2 uppercase text-lg">{user.username}</Text>}
            </View>

            {/* Horizontal FlatList */}
            <FlatList
              className="bg-white mt-2 rounded-md"
              data={DATA}
              renderItem={({ item }) => (
                <Item title={item.title} imageUrl={item.imageUrl} />
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              style={{ marginBottom: 10 }} // Add margin to separate the lists
            />

            {/* Links Section */}
            <View className="space-y-4">
              <Link href="/(auth)/sign-in">
                <Text className="text-blue-600">Sign In</Text>
              </Link>
            </View>

            {/* Vertical FlatList */}
            <FlatList
              className="bg-white mt-2 rounded-md"
              data={DATA}
              renderItem={({ item }) => (
                <Item title={item.title} imageUrl={item.imageUrl} />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={true}
              scrollEnabled={true} // Ensure vertical scrolling works
            />
          </View>
        )}
        keyExtractor={() => "header"} // Dummy key extractor
        showsVerticalScrollIndicator={true} // Show vertical scroll indicator
      />

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}


