import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type MoneyCardProps = {
  title: string;
  amount: number;
  onPress?: () => void;
};

const MoneyCard = ({ title, amount, onPress }: MoneyCardProps) => (
  <Pressable onPress={onPress}>
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>${amount}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#27c7d2",
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  amount: { fontSize: 14, color: "#fff" },
});

export default MoneyCard;
