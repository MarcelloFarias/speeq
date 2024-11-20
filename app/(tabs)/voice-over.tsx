import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { AntDesign } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { showToastError } from "@/components/toast";

export default function VoiceOverScreen() {
  const [voiceOverInputValue, setVoiceOverInputValue] = useState<string>("");

  function speak() {
    if (!voiceOverInputValue) {
      showToastError(
        "Não foi possível criar narração!",
        "Por favor, digite algum texto para transformar em fala!"
      );

      return;
    }

    Speech.speak(voiceOverInputValue);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text
        style={{
          fontSize: 28,
          marginLeft: 16,
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Narrador
      </Text>

      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <Input
            label="Digite algum texto"
            onChangeText={(text: string) => setVoiceOverInputValue(text)}
            value={voiceOverInputValue}
            editable={false}
            marginTop={32}
            placeholder="Digite o que deseja transformar em fala..."
          />

          <Button onPress={() => speak()} marginTop={16}>
            <AntDesign color="#fff" name="sound" size={24} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
