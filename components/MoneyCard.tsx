import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type MoneyCardProps = { 
  title: string; 
  amount: number; 
  type?: string;  // optional for coloring
  onPress?: () => void; 
};

const MoneyCard = ({ title, amount, type, onPress }: MoneyCardProps) => (
  <Pressable onPress={onPress}>
    <View style={[styles.card, { backgroundColor: type === "Income" ? "#27c7d2" :
                                   type === "Expense" ? "#ff6b6b" :
                                   type === "Savings" ? "#4ecdc4" :
                                   type === "Investment" ? "#1a535c" : "#666104" }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>${amount}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: { padding: 16, margin: 8, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  amount: { fontSize: 14, color: "#fff" },
});

export default MoneyCard;
