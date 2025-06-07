import React, { useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import DoaItem from "./DoaItem";

interface Doa {
  id: string;
  name: string;
}

interface DoaListProps {
  searchQuery?: string;
  isLoading?: boolean;
  doas?: Doa[];
}

export default function DoaList({
  searchQuery = "",
  isLoading = false,
  doas = [
    { id: "1", name: "Doa Sebelum Tidur" },
    { id: "2", name: "Doa Bangun Tidur" },
    { id: "3", name: "Doa Sebelum Makan" },
    { id: "4", name: "Doa Setelah Makan" },
    { id: "5", name: "Doa Masuk Masjid" },
    { id: "6", name: "Doa Keluar Masjid" },
    { id: "7", name: "Doa Sebelum Belajar" },
    { id: "8", name: "Doa Setelah Belajar" },
    { id: "9", name: "Doa Untuk Kedua Orang Tua" },
    { id: "10", name: "Doa Keselamatan Dunia dan Akhirat" },
  ],
}: DoaListProps) {
  // Filter doas based on search query
  const filteredDoas = doas.filter((doa) =>
    doa.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDoaPress = (id: string) => {
    router.push(`/doa/${id}`);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#90D1CA]">
        <ActivityIndicator size="large" color="#096B68" />
      </View>
    );
  }

  if (filteredDoas.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-[#90D1CA]">
        <Text className="text-[#096B68] text-lg font-medium text-center">
          Tidak ada doa yang ditemukan.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#90D1CA]">
      <FlatList
        data={filteredDoas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoaItem
            id={item.id}
            name={item.name}
            onPress={() => handleDoaPress(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
