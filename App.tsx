import React from "react";
import { MoneyProvider } from "./context/MoneyContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <MoneyProvider>
      <AppNavigator />
    </MoneyProvider>
  );
}
