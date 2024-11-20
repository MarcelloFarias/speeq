import { View, Text, Pressable } from "react-native";
import { theme } from "@/theme";
import * as Speech from "expo-speech";
import Icon from "./SoundIcon";
import { ISound } from "@/src/interfaces/interfaces";

interface ISoundItemProps {
  sound: ISound;
}

export function SoundItem(props: ISoundItemProps) {
  return (
    <Pressable
      style={({ pressed }: any) => [{ opacity: pressed ? 0.5 : 1 }]}
      onPress={() => Speech.speak(props.sound.soundName)}
    >
      <View
        style={{
          height: 148,
          width: 132,
          margin: 20,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors[50],
        }}
      >
        <Icon family={props.sound.iconFamily} name={props?.sound.iconName} />
        <Text
          style={{
            marginTop: 16,
            paddingHorizontal: 8,
            color: theme.colors[950],
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {props.sound.soundName}
        </Text>
      </View>
    </Pressable>
  );
}

export default SoundItem;
