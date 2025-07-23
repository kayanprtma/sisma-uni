import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function LihatData() {
  const [mahasiswa, setMahasiswa] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    const { data, error } = await supabase.from("mahasiswa").select("*");

    if (error) {
      Alert.alert("Gagal mengambil data", error.message);
    } else {
      setMahasiswa(data);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus data ini?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("mahasiswa")
            .delete()
            .eq("id", id);
          if (error) {
            Alert.alert("Gagal menghapus", error.message);
          } else {
            Alert.alert("Berhasil dihapus");
            fetchMahasiswa(); // Refresh data
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Data Mahasiswa</Text>

      {mahasiswa.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada data mahasiswa.</Text>
      ) : (
        mahasiswa.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text>
              <Text style={styles.label}>NIM:</Text> {item.nim}
            </Text>
            <Text>
              <Text style={styles.label}>Nama:</Text> {item.nama}
            </Text>
            <Text>
              <Text style={styles.label}>Tanggal Lahir:</Text>{" "}
              {item.tanggal_lahir}
            </Text>
            <Text>
              <Text style={styles.label}>Jenis Kelamin:</Text>{" "}
              {item.jenis_kelamin}
            </Text>
            <Text>
              <Text style={styles.label}>Alamat:</Text> {item.alamat}
            </Text>

            <View style={styles.buttonRow}>
              <Button
                title="Edit"
                onPress={() =>
                  router.push({
                    pathname: "/EditData",
                    params: { id: item.id },
                  })
                }
              />
              <View style={{ width: 10 }} />
              <Button
                title="Hapus"
                color="red"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
});
