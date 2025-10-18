import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../app/screens/DashboardScreen";
import FinanceScreen from "../app/screens/FinanceScreen";
import QueueScreen from "../app/screens/QueueScreen";
import SettingsScreen from "../app/screens/SettingsScreen";
import TransactionScreen from "../app/screens/TransactionScreen";
import QueueHistoryScreen from "../app/screens/QueueHistory"; // make sure this exists
import AnalyticsScreen from "../app/screens/AnalyticsScreen";
import SupportScreen from "../app/screens/SupportScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
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
