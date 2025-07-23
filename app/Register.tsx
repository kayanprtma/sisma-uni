import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Register() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Pendaftaran Gagal", error.message);
    } else {
      const user = data.user;

      // Insert nama ke tabel profiles (dengan upsert agar fleksibel)
      if (user?.id) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: user.id,
          nama: nama,
        });

        if (profileError) {
          Alert.alert("Gagal Menyimpan Nama", profileError.message);
        }
      }

      Alert.alert(
        "Pendaftaran Berhasil",
        "Silakan cek email kamu untuk verifikasi akun."
      );
      router.replace("/Login");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        onChangeText={setNama}
        value={nama}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button
        title={loading ? "Loading..." : "Daftar"}
        onPress={signUpWithEmail}
        disabled={loading}
      />

      <View style={styles.registerLink}>
        <Text style={styles.marginBottom}>Sudah punya akun?</Text>
        <Button title="Login" onPress={() => router.push("/Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  marginBottom: {
    marginBottom: 20,
  },
});
