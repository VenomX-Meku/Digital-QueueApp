import React, { useContext, useState } from "react";
import { View, Text, Button, Alert, FlatList, StyleSheet, Switch } from "react-native";
import { MoneyContext, QueueData } from "../context/MoneyContext";

export default function QueueScreen() {
  const context = useContext(MoneyContext);
  const [vip, setVip] = useState(false);

  if (!context) return null;

  const { queue, joinQueue, removeQueue, clearQueue } = context;

  const handleJoinQueue = () => {
    const type = vip ? "VIP" : "Normal"; // convert boolean to type
    const ticket = joinQueue(type);
    Alert.alert("Queue Joined", `Your ticket number is ${ticket}${vip ? " (VIP)" : ""}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="Join Queue" onPress={handleJoinQueue} />
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 12 }}>
          <Text>VIP</Text>
          <Switch value={vip} onValueChange={setVip} />
        </View>
      </View>
      <View style={{ height: 10 }} />
      <Button title="Clear Queue" color="red" onPress={clearQueue} />

      <FlatList
        style={{ marginTop: 16 }}
        data={queue}
        keyExtractor={(item) => item.ticket}
        renderItem={({ item }: { item: QueueData }) => (
          <View style={styles.card}>
            <Text style={styles.ticket}>Ticket: {item.ticket} ({item.type})</Text>
            <Text style={styles.position}>Position: {item.position}</Text>
            <Button title="Remove" color="#900" onPress={() => removeQueue(item.ticket)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, paddingHorizontal: 16 },
  row: { flexDirection: "row", alignItems: "center" },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#666104",
  },
  ticket: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  position: { fontSize: 14, color: "#fff", marginBottom: 8 },
});
