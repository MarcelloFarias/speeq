import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import { Text, View } from "react-native";
import { theme } from "@/theme";

interface IIconProps {
  family: string;
  name: any;
  size?: number;
  style?: any;
}

function Icon(props: IIconProps) {
  return (
    <View
      style={{
        ...props.style,
        padding: props.style?.padding || 20,
        backgroundColor: props.style?.backgroundColor || theme.colors[200],
        borderRadius: props.style?.borderRadius || 50,
      }}
    >
      <Text style={{ color: theme.colors[950] }}>
        {props.family === "AntDesign" && (
          <AntDesign name={props.name} size={props?.size || 24} />
        )}

        {props.family === "MaterialCommunityIcons" && (
          <MaterialCommunityIcons name={props.name} size={props?.size || 24} />
        )}

        {props.family === "MaterialIcons" && (
          <MaterialIcons name={props.name} size={props?.size || 24} />
        )}

        {props.family === "Ionicons" && (
          <Ionicons name={props.name} size={props?.size || 24} />
        )}

        {props.family === "Ionicons" && (
          <Ionicons name={props.name} size={props?.size || 24} />
        )}

        {props.family === "Entypo" && (
          <Entypo name={props.name} size={props?.size || 24} />
        )}

        {props.family === "EvilIcons" && (
          <EvilIcons name={props.name} size={props?.size || 24} />
        )}

        {props.family === "Feather" && (
          <Feather name={props.name} size={props?.size || 24} />
        )}

        {props.family === "FontAwesome" && (
          <FontAwesome name={props.name} size={props?.size || 24} />
        )}

        {props.family === "FontAwesome5" && (
          <FontAwesome5 name={props.name} size={props?.size || 24} />
        )}

        {props.family === "FontAwesome6" && (
          <FontAwesome6 name={props.name} size={props?.size || 24} />
        )}

        {props.family === "Fontisto" && (
          <Fontisto name={props.name} size={props?.size || 24} />
        )}

        {props.family === "Foundation" && (
          <Foundation name={props.name} size={props?.size || 24} />
        )}

        {props.family === "Octicons" && (
          <Octicons name={props.name} size={props?.size || 24} />
        )}

        {props.family === "SimpleLineIcons" && (
          <SimpleLineIcons name={props.name} size={props?.size || 24} />
        )}

        {props.family === "Zocial" && (
          <Zocial name={props.name} size={props?.size || 24} />
        )}
      </Text>
    </View>
  );
}

export default Icon;
