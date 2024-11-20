import { SafeAreaView, Pressable, Text, FlatList } from "react-native";
import { selectSounds } from "@/src/state-management/slices/sounds-slice";
import { useSelector } from "react-redux";
import SoundListItem from "@/components/SoundListItem";

export default function ListScreen() {
  const sounds = useSelector(selectSounds);

  return (
    <SafeAreaView style={{ flex: 1, flexGrow: 1, backgroundColor: "#fff" }}>
      <Text
        style={{
          fontSize: 28,
          marginLeft: 16,
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Minha Lista
      </Text>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 16,
          paddingBottom: 16,
        }}
        keyExtractor={(_, index) => `sound-${index}`}
        data={sounds}
        renderItem={({ item }: any) => <SoundListItem sound={item} />}
      />
    </SafeAreaView>
  );
}
