// app/screens/QueueScreen.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
  Vibration,
  RefreshControl,
  Animated,
  Clipboard, // ✅ use React Native Clipboard
} from "react-native";
import { MoneyContext, QueueData } from "../../context/MoneyContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function QueueScreen() {
  const ctx = useContext(MoneyContext);
  const [vip, setVip] = useState(false);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showNotice, setShowNotice] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");

  if (!ctx) return null;
  const { queue, joinQueue, removeQueue, clearQueue } = ctx;

  // Stats
  const averageWaitTime = 3;
  const vipCount = queue.filter((q) => q.type === "VIP").length;
  const normalCount = queue.length - vipCount;

  // Sorting & Filtering
  const sortedQueue = [...queue].sort((a, b) =>
    a.type === "VIP" && b.type !== "VIP" ? -1 : 1
  );
  const filteredQueue = sortedQueue.filter((q) =>
    q.ticket.toLowerCase().includes(search.toLowerCase())
  );

  // Timer
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (queue.length > 0 && !startTime) setStartTime(new Date());
    if (queue.length === 0) setStartTime(null);
    const interval = setInterval(() => {
      if (startTime) {
        const diff = Math.floor((Date.now() - startTime.getTime()) / 60000);
        setElapsed(diff);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [queue, startTime]);

  // Animated notice
  const showAnimatedNotice = (msg: string, duration = 2000) => {
    setNoticeMessage(msg);
    setShowNotice(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setShowNotice(false));
    }, duration);
  };

  // Join Queue
  const handleJoinQueue = () => {
    const type = vip ? "VIP" : "Normal";
    const ticket = joinQueue(type);
    Vibration.vibrate(100);
    showAnimatedNotice(`🎟 Ticket ${ticket} added successfully!`);
  };

  // Confirm remove
  const confirmRemove = (ticket: string) => {
    Alert.alert("🗑 Remove Ticket", `Remove ticket ${ticket}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          removeQueue(ticket);
          showAnimatedNotice(`❌ Ticket ${ticket} removed`);
        },
      },
    ]);
  };

  // Confirm serve
  const confirmServe = (ticket: string, type: string) => {
    Alert.alert("✅ Serve Customer", `Serve ticket ${ticket} (${type})?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Serve",
        onPress: () => {
          removeQueue(ticket);
          showAnimatedNotice(`✅ Served ${ticket} (${type})`);
        },
      },
    ]);
  };

  // Confirm clear
  const confirmClearQueue = () => {
    if (queue.length === 0)
      return Alert.alert("ℹ️ Queue is already empty.");
    Alert.alert("⚠️ Clear All Queue", "Remove all tickets permanently?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: () => {
          clearQueue();
          showAnimatedNotice("🧹 Queue cleared successfully!");
        },
      },
    ]);
  };

  // Refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showAnimatedNotice("🔄 Queue refreshed");
    }, 800);
  };

  const nextWait =
    queue.length > 0 ? Math.max(1, Math.floor(Math.random() * 5) + 2) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Queue Management</Text>

      {/* Status */}
      <View style={styles.statusRow}>
        <Text
          style={[
            styles.status,
            { backgroundColor: queue.length > 0 ? "#4caf50" : "#bdbdbd" },
          ]}
        >
          {queue.length > 0 ? "🟢 OPEN" : "🔴 CLOSED"}
        </Text>
        {startTime && <Text style={styles.elapsed}>⏱ {elapsed} min active</Text>}
      </View>

      {/* Join Queue */}
      <View style={styles.joinRow}>
        <Button title="Join Queue" onPress={handleJoinQueue} color="#0288d1" />
        <View style={styles.vipRow}>
          <Text style={{ marginRight: 8, fontWeight: "600" }}>VIP</Text>
          <Switch value={vip} onValueChange={setVip} thumbColor="#fbc02d" />
        </View>
      </View>

      {/* Stats */}
      <Text style={styles.waitInfo}>⏳ Avg Wait: {nextWait}m</Text>
      <View style={styles.summaryBox}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="account-group" size={20} color="#1b5e20" />
          <Text style={styles.statText}>Total: {queue.length}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="star" size={20} color="#ffb300" />
          <Text style={styles.statText}>VIP: {vipCount}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="account" size={20} color="#3e2723" />
          <Text style={styles.statText}>Normal: {normalCount}</Text>
        </View>
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchBox}
        placeholder="🔍 Search ticket..."
        placeholderTextColor="#555"
        value={search}
        onChangeText={setSearch}
      />

      {/* Actions */}
      <View style={styles.actionRow}>
        <Button title="🗑 Clear All" color="#c62828" onPress={confirmClearQueue} />
        <Button
          title={refreshing ? "Refreshing..." : "🔄 Refresh"}
          color="#1565c0"
          onPress={handleRefresh}
          disabled={refreshing}
        />
      </View>

      {/* Floating Notice */}
      {showNotice && (
        <Animated.View style={[styles.notice, { opacity: fadeAnim }]}>
          <Text style={styles.noticeText}>{noticeMessage}</Text>
        </Animated.View>
      )}

      {/* Queue List */}
      <FlatList
        style={{ marginTop: 16 }}
        data={filteredQueue}
        keyExtractor={(item) => item.ticket}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyBox}>
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={48}
              color="#999"
            />
            <Text style={styles.emptyText}>No one in the queue yet!</Text>
          </View>
        )}
        renderItem={({ item }: { item: QueueData }) => (
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: item.type === "VIP" ? "#ffb74d" : "#607d8b",
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name={
                  item.type === "VIP"
                    ? "crown-outline"
                    : "account-circle-outline"
                }
                size={30}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <TouchableOpacity
                style={styles.serveBtn}
                onPress={() => confirmServe(item.ticket, item.type)}
              >
                <MaterialCommunityIcons name="check" size={18} color="#fff" />
              </TouchableOpacity>

              <View style={{ flex: 1, marginLeft: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(item.ticket);
                    showAnimatedNotice(`📋 Ticket ${item.ticket} copied!`);
                  }}
                >
                  <Text style={styles.ticket}>
                    🎟 {item.ticket} ({item.type})
                  </Text>
                </TouchableOpacity>

                <Text style={styles.position}>Position: {item.position}</Text>
                <Text style={{ color: "#fff", fontSize: 13 }}>
                  ⏳ Est. Wait: {item.position * averageWaitTime} min
                </Text>

                {item.type === "VIP" && (
                  <Text
                    style={{
                      color: "#fffde7",
                      fontWeight: "700",
                      marginLeft: 6,
                      fontSize: 12,
                    }}
                  >
                    VIP
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => confirmRemove(item.ticket)}
              >
                <MaterialCommunityIcons name="delete" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#dbf6f1ff" },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#006064",
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  status: {
    color: "#fff",
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  elapsed: { color: "#004d40", fontWeight: "500" },
  joinRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  vipRow: { flexDirection: "row", alignItems: "center", marginLeft: 12 },
  waitInfo: {
    marginTop: 4,
    fontWeight: "600",
    color: "#006064",
    textAlign: "center",
  },
  summaryBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#b2dfdb",
    padding: 10,
    borderRadius: 12,
    marginVertical: 8,
  },
  statItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  statText: { fontWeight: "600", color: "#004d40" },
  searchBox: {
    borderWidth: 1,
    borderColor: "#0097a7",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#e0f2f1",
    marginVertical: 6,
    color: "#004d40",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  card: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticket: { color: "#a8f41aff", fontWeight: "700", fontSize: 16 },
  position: { color: "#f8f2f2ff", fontSize: 13, marginTop: 2 },
  serveBtn: {
    backgroundColor: "#26962cff",
    padding: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  removeBtn: {
    backgroundColor: "#c62828",
    padding: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  emptyBox: { alignItems: "center", marginTop: 60 },
  emptyText: { color: "#999", fontSize: 16, marginTop: 8 },
  notice: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "rgba(27, 215, 21, 1)",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  noticeText: { color: "#fff", fontWeight: "700" },
});
