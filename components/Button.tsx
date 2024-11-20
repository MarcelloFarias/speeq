import { StyleSheet, Pressable, Text, DimensionValue } from "react-native";
import { theme } from "@/theme";

interface IButtonProps {
  text?: string;
  onPress: any;
  style?: any;
  backgroundColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  children?: any;
  color?: string;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
  fontSize?: number;
  borderWidth?: number;
}

function Button(props: IButtonProps) {
  const buttonStyle = StyleSheet.create({
    ...props?.style,
    width: props?.width || "90%",
    display: props?.style?.display || "flex",
    alignItems: props?.style?.alignItems || "center",
    justifyContent: props?.style?.justifyContent || "center",
    alignSelf: "center",
    backgroundColor: props?.backgroundColor || theme.colors[500],
    height: props?.height || 42,
    borderRadius: props?.style?.borderRadius || 50,
    marginLeft: props?.marginLeft || 0,
    marginTop: props?.marginTop || 0,
    marginBottom: props?.marginBottom || 0,
    marginRight: props?.marginRight || 0,
    borderWidth: props?.borderWidth || 0,
  });

  return (
    <Pressable
      style={({ pressed }: any) => [
        buttonStyle,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={props?.onPress}
    >
      {props?.children ? (
        props?.children
      ) : (
        <Text
          style={{
            fontSize: props?.fontSize || 18,
            color: props?.color || "#fff",
          }}
        >
          {props?.text}
        </Text>
      )}
    </Pressable>
  );
}

export default Button;
