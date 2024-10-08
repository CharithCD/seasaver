import * as React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface ProfileImageProps {
    fullName: string;
    username: string;
    logo: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ fullName, username, logo }) => {

  return (
    <View className="flex flex-row p-4 bg-white rounded-lg">
      <Image
        className="rounded-full border-2 border-red-100 w-20 h-20"
        resizeMode="cover"
        source={{uri: logo}}
      />
      <View className="flex flex-col p-2 justify-center">
        <Text className="text-2xl uppercase">{fullName}</Text>
        <Text className="text-sm">@{username}</Text>
      </View>
    </View>
  );
};

export default ProfileImage;
