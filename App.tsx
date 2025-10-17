import React, { useContext } from "react";
import { Text, Button, Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { MoneyProvider, MoneyContext } from "./context/MoneyContext";
import MoneyCard from "./components/MoneyCard";
import QueueIndex from "./app/index"; // queue landing wrapper

export default function App() {
  return (
    <MoneyProvider>
      <MainApp />
    </MoneyProvider>
  );
}

function MainApp() {
  const context = useContext(MoneyContext);
  if (!context) return null;

  const { cards, addCard, total } = context;

  const handleCardPress = (title: string, amount: number) => {
    Alert.alert(`${title}`, `You pressed ${title} of $${amount}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Finance & Queue App</Text>

        <Button
          title="Add New Card (Investment $150)"
          onPress={() => addCard("Investment", 150)}
        />

        {cards.map((card, index) => (
          <MoneyCard
            key={index}
            title={card.title}
            amount={card.amount}
            onPress={() => handleCardPress(card.title, card.amount)}
          />
        ))}

        <Text style={styles.total}>Total: ${total}</Text>

        <Text style={styles.queueHeader}>Queue</Text>

        <QueueIndex />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  total: { fontSize: 20, fontWeight: "bold", marginVertical: 16 },
  queueHeader: { fontSize: 22, fontWeight: "bold", marginVertical: 12 },
});
