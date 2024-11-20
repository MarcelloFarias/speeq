import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { theme } from "@/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors[800],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="register-sound"
        options={{
          title: "Novo",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="voice-over"
        options={{
          title: "Narrador",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "mic-sharp" : "mic-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Minha Lista",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list-sharp" : "list-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
