import React, { useState } from "react";
import { View, Text, TextInput, StatusBar, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Search } from "lucide-react-native";
import DoaList from "./components/DoaList";
import AdMobBannerComponent from "./components/AdMobBanner";

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for prayers
  const doaList = [
    { id: "1", name: "Doa Sebelum Tidur" },
    { id: "2", name: "Doa Bangun Tidur" },
    { id: "3", name: "Doa Sebelum Makan" },
    { id: "4", name: "Doa Setelah Makan" },
    { id: "5", name: "Doa Masuk Masjid" },
    { id: "6", name: "Doa Keluar Masjid" },
    { id: "7", name: "Doa Memohon Ilmu" },
    { id: "8", name: "Doa Memohon Kesehatan" },
    { id: "9", name: "Doa Memohon Keselamatan" },
    { id: "10", name: "Doa Memohon Rezeki" },
  ];

  // Filter prayers based on search query
  const filteredDoas = doaList.filter((doa) =>
    doa.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#096B68]">
      <StatusBar barStyle="light-content" backgroundColor="#096B68" />
      <Stack.Screen
        options={{
          title: "Doa dari Alquran",
          headerStyle: { backgroundColor: "#096B68" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="flex-1 bg-[#096B68]">
        {/* Header with gradient background */}
        <View className="px-4 pt-4 pb-6 bg-[#096B68]">
          <Text className="text-2xl font-bold text-white mb-4 text-center">
            Doa dari Alquran
          </Text>

          {/* Search bar */}
          <View className="flex-row items-center bg-white rounded-full px-4 py-2">
            <Search size={20} color="#096B68" />
            <TextInput
              className="flex-1 ml-2 text-[#096B68]"
              placeholder="Cari Doa..."
              placeholderTextColor="#90D1CA"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Prayer list */}
        <View className="flex-1 bg-white rounded-t-3xl">
          <DoaList doas={filteredDoas} />
        </View>

        {/* AdMob Banner at the bottom */}
        <AdMobBannerComponent />
      </View>
    </SafeAreaView>
  );
}
