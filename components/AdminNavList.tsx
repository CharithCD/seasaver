import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavListItem from "./NavListItem";

const LinksList = [
    {
      title: "Profile",
      link: "/",
    },
    {
      title: "Events",
      link: "/(event)/AllEvents",
    },
    {
        title: "Blogs",
        link: "/(blog)/AllBlogs",
    },
    {
        title: "Competitions",
        link: "/(competition)/AllCompetitions",
    },
  ];

const AdminNavList = () => {
  return (
    <View className="bg-white rounded-xl">
      {LinksList.map((item, index) => (
        <NavListItem key={index} text={item.title} link={item.link} />
      ))}
    </View>
  );
};

export default AdminNavList;
