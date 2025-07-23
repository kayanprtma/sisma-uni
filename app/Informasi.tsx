import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Informasi() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informasi Aplikasi</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Nama:</Text>
        <Text style={styles.value}>I Wayan Bagus Satria Putra Pratama</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Instansi:</Text>
        <Text style={styles.value}>Universitas Primakara (2022)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Tujuan:</Text>
        <Text style={styles.value}>
          Sertifikasi Junior Mobile Programmer melalui program VSGA Kominfo
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Copyright:</Text>
        <Text style={styles.value}>
          © {new Date().getFullYear()} I Wayan Bagus Satria Putra Pratama. All
          rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});
