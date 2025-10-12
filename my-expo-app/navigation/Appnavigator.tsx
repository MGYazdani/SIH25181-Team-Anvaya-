import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import NotificationScreen from "../screens/NotificationScreen";
import HazardReportScreen from "../screens/HazardReportScreen";
import ChecklistScreen from "../screens/ChecklistScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Checklist" component={ChecklistScreen} />
        <Stack.Screen name="HazardReport" component={HazardReportScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />

       </Stack.Navigator>
    </NavigationContainer>
  );
}