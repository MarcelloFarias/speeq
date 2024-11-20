import { ISound } from "@/src/interfaces/interfaces";
import { theme } from "@/theme";
import { Pressable, Text, View, Alert } from "react-native";
import Icon from "./SoundIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  selectSounds,
  setSounds,
} from "@/src/state-management/slices/sounds-slice";
import { useSelector, useDispatch } from "react-redux";
import { showToastSuccess } from "./toast";

interface ISoundListItemProps {
  sound: ISound;
}

function SoundListItem(props: ISoundListItemProps) {
  const sounds = useSelector(selectSounds);
  const dispatch = useDispatch();

  async function deleteSound() {
    Alert.alert(
      "Tem certeza que deseja excluir esta fala/ação ?",
      "A ação não poderá ser desfeita",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            const filteredSounds = sounds.filter((sound: ISound) => {
              return sound && sound !== props?.sound;
            });

            await AsyncStorage.setItem(
              "@sounds",
              JSON.stringify(filteredSounds)
            );

            dispatch(setSounds(filteredSounds));

            showToastSuccess("Fala/ação excluída com sucesso!", "");
          },
          style: "destructive",
        },
      ]
    );
  }

  return (
    <Pressable
      style={{
        height: 84,
        borderWidth: 1,
        borderColor: theme.colors[200],
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",

          maxWidth: "80%",
        }}
      >
        <Icon
          size={14}
          name={props?.sound?.iconName}
          family={props?.sound?.iconFamily}
        />
        <Text numberOfLines={1} ellipsizeMode="clip" style={{ marginLeft: 12 }}>
          {props?.sound?.soundName}
        </Text>
      </View>

      <Pressable
        style={({ pressed }: any) => [
          {
            opacity: pressed ? 0.5 : 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            padding: 4,
          },
        ]}
        onPress={() => deleteSound()}
      >
        <Ionicons name="trash-outline" size={28} color="red" />
      </Pressable>
    </Pressable>
  );
}

export default SoundListItem;
