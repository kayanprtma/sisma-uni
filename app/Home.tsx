import { router } from "expo-router";
import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Home() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Logout Gagal", error.message);
    } else {
      router.replace("/Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang di SismaUni</Text>

      <View style={styles.buttonContainer}>
        <Button title="Lihat Data" onPress={() => router.push("/LihatData")} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Input Data" onPress={() => router.push("/InputData")} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Informasi" onPress={() => router.push("/Informasi")} />
      </View>

      <View style={styles.logoutContainer}>
        <Button title="Log Out" color="#d9534f" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginBottom: 16,
  },
  logoutContainer: {
    marginTop: 40,
  },
});
