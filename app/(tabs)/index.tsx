import { theme } from "@/theme";
import { SafeAreaView, Text, FlatList, View } from "react-native";
import { useWindowDimensions } from "react-native";
import SoundItem from "@/components/SoundItem";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSounds,
  setSounds,
} from "@/src/state-management/slices/sounds-slice";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const sounds = useSelector(selectSounds);

  const verifyIsFirstTimeOpen = async () => {
    const configs = await AsyncStorage.getItem("@configs");

    if (configs !== null) {
      const configsObj = JSON.parse(configs);

      if (configsObj?.isFirstTimeOpen) {
        router.navigate("./onboarding");
      }
    }

    if (configs === null) {
      router.navigate("./onboarding");
    }
  };

  useEffect(() => {
    verifyIsFirstTimeOpen();
  }, []);

  const getAllSounds = useCallback(async () => {
    const localStorageSounds = await AsyncStorage.getItem("@sounds");

    if (localStorageSounds !== null) {
      dispatch(setSounds(JSON.parse(localStorageSounds)));
    }
  }, [dispatch]);

  useEffect(() => {
    getAllSounds();
  }, [getAllSounds]);

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "#fff" }}>
      <Text
        style={{
          fontSize: 28,
          marginLeft: 16,
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Sons salvos
      </Text>

      <View
        style={{
          width: width,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <FlatList
          data={sounds}
          keyExtractor={(_, index) => `Sound-${index}`}
          renderItem={({ item }: any) => <SoundItem sound={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
