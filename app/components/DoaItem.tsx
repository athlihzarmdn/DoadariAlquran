import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";

interface DoaItemProps {
  id: string;
  name: string;
  onPress?: () => void;
}

const DoaItem = ({ id = "1", name = "Doa Pembuka", onPress }: DoaItemProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/doa/${id}`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center justify-between p-4 mb-2 rounded-lg bg-white border-l-4 border-[#129990] shadow-sm"
      activeOpacity={0.7}
    >
      <View className="flex-1">
        <Text className="text-lg font-medium text-gray-800">{name}</Text>
      </View>
      <ChevronRight size={20} color="#096B68" />
    </TouchableOpacity>
  );
};

export default DoaItem;
