import { View, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [wallet, setWallet] = useState(200);

  const deposit = () => setWallet(wallet + 20);
  const withdraw = () => setWallet(wallet - 20 >= 0 ? wallet - 20 : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      <Text style={styles.money}>💰 Wallet: ${wallet}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Deposit $20" onPress={deposit} color="#27c7d2" />
        <Button title="Withdraw $20" onPress={withdraw} color="#666104" />
      </View>

      <Text style={{ marginTop: 20, fontSize: 16 }}>Manage your money easily!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold' },
  money: { fontSize: 20, marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
});
