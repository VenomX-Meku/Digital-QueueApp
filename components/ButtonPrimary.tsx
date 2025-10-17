import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = { title: string; onPress: () => void; color?: string };

const ButtonPrimary = ({ title, onPress, color = "#27c7d2" }: ButtonProps) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { padding: 12, borderRadius: 8, marginVertical: 8, alignItems: "center" },
  text: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ButtonPrimary;
