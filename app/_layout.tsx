import { Stack } from "expo-router";
import React from "react";
import Globalprovider from "../context/Globalprovider";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Globalprovider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Globalprovider>
  );
}
