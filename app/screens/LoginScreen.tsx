// app/screens/LoginScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [secureText, setSecureText] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [users, setUsers] = useState<{ username: string; password: string; role: string }[]>([]);
  const [loggedInRole, setLoggedInRole] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const savedUsers = await AsyncStorage.getItem("users");
      if (savedUsers) setUsers(JSON.parse(savedUsers));

      const role = await AsyncStorage.getItem("userRole");
      if (role) {
        setLoggedInRole(role);
        navigation.replace("Dashboard");
      }
    };
    loadUsers();
  }, []);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/.test(password);

  const showToast = (message: string) => {
    const toast = Toast.show(message, {
      duration: Toast.durations.LONG, // ✅ Use LONG instead of FOREVER
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      backgroundColor: "#27c7d2",
      textColor: "#fff",
      delay: 0,
    });
    return toast;
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }
    const foundUser = users.find(
      u =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password &&
        u.role === (isAdminMode ? "admin" : "user")
    );
    if (!foundUser) {
      Alert.alert("Error", "Invalid username or password");
      return;
    }

    await AsyncStorage.setItem("userRole", foundUser.role);
    setLoggedInRole(foundUser.role);

    // ✅ Show toast, wait 2 seconds, then navigate
    const toast = showToast(`✅ ${isAdminMode ? "Admin" : "User"} Login Successful!`);
    setTimeout(() => {
      Toast.hide(toast);
      navigation.replace("Dashboard");
    }, 2000);
  };

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must contain uppercase, lowercase, and a number."
      );
      return;
    }
    const userExists = users.find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
    if (userExists) {
      Alert.alert("Error", "Username already exists");
      return;
    }

    const newUser = { username, password, role: isAdminMode ? "admin" : "user" };
    const updatedUsers = [...users, newUser];
    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    // ✅ Show toast for signup
    const toast = showToast(`🎉 ${isAdminMode ? "Admin" : "User"} Signup Successful!`);
    setTimeout(() => {
      Toast.hide(toast);
      setIsLogin(true);
      setUsername("");
      setPassword("");
    }, 2000);
  };

  return (
    <LinearGradient colors={["#27c7d2", "#666104"]} style={styles.bg}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>
          {isAdminMode
            ? isLogin
              ? "Admin Login"
              : "Admin Sign Up"
            : isLogin
            ? "User Login"
            : "User Sign Up"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#eee"
          value={username}
          onChangeText={setUsername}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor="#eee"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureText(!secureText)}
          >
            <Ionicons
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={isLogin ? handleLogin : handleSignup}
        >
          <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin
              ? `Don't have an account? ${isAdminMode ? "Admin" : "User"} Sign Up`
              : `Already have an account? ${isAdminMode ? "Admin" : "User"} Login`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsAdminMode(!isAdminMode)}
          style={{ marginTop: 10 }}
        >
          <Text style={styles.adminSwitch}>
            {isAdminMode ? "Switch to User Mode" : "Switch to Admin Mode"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 25 },
  title: { fontSize: 28, fontWeight: "900", color: "#fff", marginBottom: 30 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 10,
    paddingRight: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 15,
  },
  eyeIcon: { paddingHorizontal: 8 },
  button: {
    backgroundColor: "#27c7d2",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  toggleText: { color: "#fff", marginTop: 18, fontSize: 14 },
  adminSwitch: { color: "#ffeb3b", fontSize: 14, fontWeight: "600" },
});
