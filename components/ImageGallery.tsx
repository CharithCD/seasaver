import React from "react";
import { View, FlatList, Dimensions, Image } from "react-native";
import { styled } from "nativewind";

const { width } = Dimensions.get("window");

// Local image (wave.jpeg) using require
const wave = require("@/assets/images/wave.jpeg");

// Dummy data for the images
const images = [
  { id: "1", src: wave },
  { id: "2", src: wave },
  { id: "3", src: wave },
  // Add more images as needed
];

const ImageGallery = () => {
  return (
    <View className="flex-1 py-5">
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View className="mr-3">
            {/* Displaying the local image */}
            <Image
              source={item.src}
              style={{ width: width * 0.8, height: 200 }}
              className="rounded-lg"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ImageGallery;
