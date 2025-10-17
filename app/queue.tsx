import React, { useContext } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { MoneyContext } from "../context/MoneyContext";

export default function QueueScreen() {
  const context = useContext(MoneyContext);
  if (!context) return null;

  const { queue, joinQueue } = context;

  const handleJoinQueue = () => {
    const ticket = joinQueue();
    Alert.alert("Queue Joined", `Your ticket number is ${ticket}`);
  };

  return (
    <View>
      <Button title="Join Queue" onPress={handleJoinQueue} />
      {queue.map((q, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.ticket}>Ticket: {q.ticket}</Text>
          <Text style={styles.position}>Position: {q.position}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#666104",
  },
  ticket: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  position: { fontSize: 14, color: "#fff" },
});
