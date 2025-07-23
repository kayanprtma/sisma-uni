# Welcome to your SismaUni app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Create Table Database on Supabase
   CREATE TABLE PROFILES (
   ID UUID REFERENCES AUTH.USERS ON DELETE CASCADE PRIMARY KEY,
   NAMA TEXT
   );

   CREATE TABLE PUBLIC.MAHASISWA (
   ID UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
   NIM VARCHAR(15) UNIQUE,
   NAMA TEXT,
   TANGGAL_LAHIR DATE,
   JENIS_KELAMIN VARCHAR(20) CHECK (JENIS_KELAMIN IN ('LAKI-LAKI', 'PEREMPUAN')),
   ALAMAT TEXT
   );

   -- SET UP ROW LEVEL SECURITY (RLS)
   ALTER TABLE PROFILES
   ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "PUBLIC PROFILES ARE VIEWABLE BY EVERYONE." ON PROFILES
   FOR SELECT USING (TRUE);

   CREATE POLICY "USERS CAN INSERT THEIR OWN PROFILE." ON PROFILES
   FOR INSERT WITH CHECK ((SELECT AUTH.UID()) = ID);

   CREATE POLICY "USERS CAN UPDATE OWN PROFILE." ON PROFILES
   FOR UPDATE USING ((SELECT AUTH.UID()) = ID);

   -- TRIGGER TO AUTOMATICALLY CREATE PROFILE WHEN A NEW USER SIGNS UP
   CREATE FUNCTION PUBLIC.HANDLE_NEW_USER()
   RETURNS TRIGGER
   SET SEARCH_PATH = ''
   AS $$
   BEGIN
   INSERT INTO PUBLIC.PROFILES (ID, NAMA)
   VALUES (NEW.ID, NEW.RAW_USER_META_DATA->>'FULL_NAME');
   RETURN NEW;
   END;

   $$
   LANGUAGE PLPGSQL SECURITY DEFINER;

   CREATE TRIGGER ON_AUTH_USER_CREATED
   AFTER INSERT ON AUTH.USERS
   FOR EACH ROW EXECUTE PROCEDURE PUBLIC.HANDLE_NEW_USER();
   $$

2. Input your own supabaseUrl & supabaseAnonKey on lib/supabase.ts
   const supabaseUrl = "YOUR_REACT_NATIVE_SUPABASE_URL"
   const supabaseAnonKey = "YOUR_REACT_NATIVE_SUPABASE_ANON_KEY"

3. When you're ready, run:

   npm start

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
