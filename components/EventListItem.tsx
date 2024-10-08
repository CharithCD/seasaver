import * as React from "react";
import { Text, StyleSheet, Image, View, Pressable } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";
import logo from "../assets/images/logo.png";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Event = () => {
  return (
    <View className="flex flex-row bg-white p-6 m-4 rounded-lg">
      <View className="flex w-1/2 text-justify">
        <Text className="text-sm">Coastal Care:Community Beach Cleanup</Text>
      </View>
      <View style={styles.component2}>
        <FontAwesome name="home" size={26} color={'#006FFD'} />
        <FontAwesome name="home" size={26} color={'#006FFD'} />
        <Text style={[styles.text, styles.amTypo]}>2022/10/12</Text>
        <Text style={[styles.am, styles.amTypo]}>7.30 a.m</Text>
      </View>
      <Pressable style={styles.vector} onPress={() => {}}>
        <Image style={styles.icon} resizeMode="cover" source={logo} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    left: "0%",
    right: "86.7%",
    width: "13.3%",
    height: "32.05%",
    position: "absolute",
  },
  amTypo: {
    // fontFamily: FontFamily.interRegular,
    left: "30%",
    height: "40%",
    position: "absolute",
    textAlign: "left",
    // color: Color.neutralDarkDarkest,
    letterSpacing: 0.1,
  },
  coastalCareCommunity: {
    fontSize: 12,
    fontWeight: "600",
    // fontFamily: FontFamily.interSemiBold,
    width: 172,
    height: 39,
    textAlign: "left",
    // color: Color.neutralDarkDarkest,
    letterSpacing: 0.1,
  },
  vectorIcon: {
    bottom: "67.95%",
    top: "0%",
  },
  vectorIcon1: {
    top: "56%",
    bottom: "11.95%",
  },
  text: {
    width: "70%",
    fontSize: 11,
    top: "0%",
  },
  am: {
    width: "50%",
    top: "60%",
    fontSize: 10,
  },
  component2: {
    width: 91,
    height: 39,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  vector: {
    width: 14,
    height: 14,
  },
  event: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    flex: 1,
    height: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 0,
    gap: 25,
    width: "100%",
  },
});

export default Event;
