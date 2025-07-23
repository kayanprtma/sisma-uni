import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function InputData() {
  const router = useRouter();
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [jenisKelamin, setJenisKelamin] = useState<"Laki-laki" | "Perempuan">(
    "Laki-laki"
  );
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nim || !nama || !alamat) {
      Alert.alert("Validasi Gagal", "Mohon isi semua field");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("mahasiswa").insert([
      {
        nim,
        nama,
        tanggal_lahir: tanggalLahir.toISOString().split("T")[0],
        jenis_kelamin: jenisKelamin,
        alamat,
      },
    ]);

    setLoading(false);

    if (error) {
      Alert.alert("Gagal menyimpan data", error.message);
    } else {
      Alert.alert("Sukses", "Data berhasil disimpan");
      router.replace("/LihatData");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Input Mahasiswa</Text>

      <TextInput
        placeholder="NIM"
        style={styles.input}
        value={nim}
        onChangeText={setNim}
      />
      <TextInput
        placeholder="Nama"
        style={styles.input}
        value={nama}
        onChangeText={setNama}
      />

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
      >
        <Text style={{ color: "#000" }}>
          {tanggalLahir.toLocaleDateString("id-ID")}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={tanggalLahir}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setTanggalLahir(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Jenis Kelamin</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setJenisKelamin("Laki-laki")}
        >
          <View style={styles.radioCircle}>
            {jenisKelamin === "Laki-laki" && <View style={styles.selectedRb} />}
          </View>
          <Text>Laki-laki</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setJenisKelamin("Perempuan")}
        >
          <View style={styles.radioCircle}>
            {jenisKelamin === "Perempuan" && <View style={styles.selectedRb} />}
          </View>
          <Text>Perempuan</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Alamat"
        style={styles.input}
        value={alamat}
        onChangeText={setAlamat}
        multiline
      />

      <Button
        title={loading ? "Menyimpan..." : "Simpan"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#444",
  },
});
