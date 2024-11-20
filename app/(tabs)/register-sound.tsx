import Input from "@/components/Input";
import { Pressable, SafeAreaView, FlatList } from "react-native";
import { Text, View } from "react-native";
import { theme } from "@/theme";
import Button from "@/components/Button";
import { icons } from "@/icons/icons";
import SoundIcon from "@/components/SoundIcon";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSounds,
  setSounds,
} from "@/src/state-management/slices/sounds-slice";
import { ISound } from "@/src/interfaces/interfaces";
import SoundItem from "@/components/SoundItem";
import { showToastError, showToastSuccess } from "@/components/toast";

export default function RegisterSoundScreen() {
  const [sound, setSound] = useState<ISound>({
    iconFamily: icons[0].family,
    iconName: icons[0].name,
    soundName: "",
  });
  const sounds = useSelector(selectSounds);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  const handleSelectedIcon = (iconName: any, iconFamily: any) => {
    setSound({
      ...sound,
      iconName: iconName,
      iconFamily: iconFamily,
    });
  };

  async function registerSound() {
    if (!sound.soundName) {
      showToastError(
        "Não foi possível registrar a fala ou ação!",
        "Por favor, digite uma fala/ação!"
      );

      return;
    }

    dispatch(setSounds([...sounds, sound]));

    await AsyncStorage.setItem("@sounds", JSON.stringify([...sounds, sound]))
      .then(() => {
        setSound({
          iconFamily: icons[0].family,
          iconName: icons[0].name,
          soundName: "",
        });
      })
      .finally(() => {
        showToastSuccess(
          "Fala/ação registrada com sucesso!",
          "Agora você pode vê-la em sua lista."
        );
      });
  }

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 28,
          marginLeft: 16,
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Registrar uma fala
      </Text>

      <View style={{ marginTop: 32 }}>
        <Input
          label="Digite a fala"
          placeholder="Digite sua fala ou ação..."
          onChangeText={(text: string) =>
            setSound({
              ...sound,
              soundName: text,
            })
          }
        />

        {/* <Pressable
          style={({ pressed }: any) => [
            {
              opacity: pressed ? 0.5 : 1,
              display: "flex",
              flexDirection: "row",
              width: "90%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              paddingHorizontal: 8,
              borderRadius: 50,
              paddingVertical: 4,
              marginTop: 8,
            },
          ]}
          onPress={() =>
            SheetManager.show("select-icon-sheet", {
              payload: {
                handleSelectedIcon: handleSelectedIcon,
              },
            })
          }
        >
          <SoundIcon
            family={sound.iconFamily}
            name={sound.iconName}
            size={20}
            style={{ padding: 10 }}
          />

          <Text>{sound.iconName}</Text>

          <AntDesign name="caretright" size={20} color="black" />
        </Pressable> */}

        <Input
          label="Selecione um ícone"
          marginTop={16}
          placeholder="Pesquise por um ícone"
          onChangeText={(text: string) => setSearch(text)}
        />

        <FlatList
          style={{ marginTop: 16 }}
          contentContainerStyle={{
            gap: 20,
          }}
          keyExtractor={(_, index) => `icon-${index}`}
          data={
            !search
              ? icons
              : icons.filter((icon: any) => {
                  if (
                    icon?.translate
                      ?.toLowerCase()
                      .includes(search?.toLowerCase())
                  ) {
                    return icon;
                  }
                })
          }
          renderItem={({ item }: any) => (
            <Pressable
              style={({ pressed }: any) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  padding: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: 120,
                },
              ]}
              onPress={() => handleSelectedIcon(item.name, item.family)}
            >
              <SoundIcon
                family={item.family}
                name={item.name}
                size={32}
                style={{ padding: 12 }}
              />

              <Text
                style={{ marginTop: 12 }}
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                {item.translate}
              </Text>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text
          style={{
            marginLeft: 16,
            fontWeight: 600,
            fontSize: 16,
            marginTop: 16,
          }}
        >
          Seu card ficará assim:
        </Text>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SoundItem sound={sound} />
        </View>

        <Button marginTop={16} text="Salvar" onPress={() => registerSound()} />
      </View>
    </SafeAreaView>
  );
}
