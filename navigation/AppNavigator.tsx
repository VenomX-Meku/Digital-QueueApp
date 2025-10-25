// navigation/AppNavigator.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../app/screens/LoginScreen";
import DashboardScreen from "../app/screens/DashboardScreen";
import FinanceScreen from "../app/screens/FinanceScreen";
import QueueScreen from "../app/screens/QueueScreen";
import SettingsScreen from "../app/screens/SettingsScreen";
import TransactionScreen from "../app/screens/TransactionScreen";
import QueueHistoryScreen from "../app/screens/QueueHistory";
import AnalyticsScreen from "../app/screens/AnalyticsScreen";
import SupportScreen from "../app/screens/SupportScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<string>("Login");

  // ✅ Load role and set initial route
  useEffect(() => {
    const loadRole = async () => {
      const role = await AsyncStorage.getItem("userRole");
      if (role === "admin" || role === "user") setInitialRoute("Dashboard");
      else setInitialRoute("Login");
    };
    loadRole();
  }, []);

  return (
    <NavigationContainer>
      {/* ✅ Added screenOptions to control navbar color */}
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffba0b65", // ✅ Navbar background color
          },
          headerTintColor: "#ffffff", // ✅ Navbar text/icon color
          headerTitleStyle: {
            fontWeight: "bold", // ✅ Bold title
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Finance" component={FinanceScreen} />
        <Stack.Screen name="Queue" component={QueueScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Transactions" component={TransactionScreen} />
        <Stack.Screen name="QueueHistory" component={QueueHistoryScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
