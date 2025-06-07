import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

interface DoaData {
  id: string;
  name: string;
  arabic: string;
  translation: string;
}

// Mock data for prayers
const mockDoas: DoaData[] = [
  {
    id: "1",
    name: "Doa Memohon Petunjuk",
    arabic:
      "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
    translation:
      '"Ya Tuhan kami, janganlah Engkau jadikan hati kami condong kepada kesesatan sesudah Engkau beri petunjuk kepada kami, dan karuniakanlah kepada kami rahmat dari sisi Engkau; karena sesungguhnya Engkau-lah Maha Pemberi (karunia)."',
  },
  {
    id: "2",
    name: "Doa Memohon Kebaikan",
    arabic:
      "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translation:
      '"Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka."',
  },
  {
    id: "3",
    name: "Doa Memohon Kesabaran",
    arabic:
      "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    translation:
      '"Ya Tuhan kami, limpahkanlah kesabaran kepada kami dan kokohkanlah pendirian kami dan tolonglah kami terhadap orang-orang kafir."',
  },
  {
    id: "4",
    name: "Doa Memohon Ampunan",
    arabic:
      "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    translation:
      '"Ya Tuhan kami, ampunilah dosa-dosa kami dan tindakan-tindakan kami yang berlebih-lebihan dalam urusan kami dan tetapkanlah pendirian kami, dan tolonglah kami terhadap kaum yang kafir."',
  },
  {
    id: "5",
    name: "Doa Memohon Perlindungan",
    arabic:
      "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ الظَّالِمِينَ وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ",
    translation:
      '"Ya Tuhan kami, janganlah Engkau jadikan kami sasaran fitnah bagi kaum yang zalim, dan selamatkanlah kami dengan rahmat Engkau dari (tipu daya) orang-orang yang kafir."',
  },
];

export default function DoaDetail() {
  const router = useRouter();
  const { id = "1" } = useLocalSearchParams();

  // Find the current doa based on id
  const currentDoa = mockDoas.find((doa) => doa.id === id) || mockDoas[0];

  // Get the index of the current doa
  const currentIndex = mockDoas.findIndex((doa) => doa.id === id);

  // Calculate next doa id (with circular navigation)
  const nextId =
    currentIndex < mockDoas.length - 1
      ? mockDoas[currentIndex + 1].id
      : mockDoas[0].id;

  // Navigate to the next doa
  const handleNextDoa = () => {
    router.push(`/doa/${nextId}`);
  };

  // Navigate back to the list
  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-[#096B68]">
      {/* Header */}
      <View className="pt-12 pb-4 px-4 bg-[#129990]">
        <TouchableOpacity
          onPress={handleBack}
          className="flex-row items-center"
        >
          <ArrowLeft size={24} color="white" />
          <Text className="text-white text-lg ml-2">Kembali</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 bg-gradient-to-b from-[#129990] to-[#096B68]">
        <View className="p-6">
          {/* Doa Name */}
          <View className="bg-white/10 rounded-lg p-4 mb-6">
            <Text className="text-2xl font-bold text-white text-center">
              {currentDoa.name}
            </Text>
          </View>

          {/* Arabic Text */}
          <View className="bg-white/10 rounded-lg p-6 mb-6">
            <Text
              className="text-3xl text-white text-right leading-10"
              style={{ fontFamily: "System" }}
            >
              {currentDoa.arabic}
            </Text>
          </View>

          {/* Translation */}
          <View className="bg-white/10 rounded-lg p-6">
            <Text className="text-lg text-white leading-7">
              {currentDoa.translation}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View className="p-4 bg-[#096B68]">
        <TouchableOpacity
          onPress={handleNextDoa}
          className="bg-[#129990] py-4 px-6 rounded-full flex-row justify-center items-center"
        >
          <Text className="text-white text-lg font-medium mr-2">
            Doa Selanjutnya
          </Text>
          <ArrowRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
