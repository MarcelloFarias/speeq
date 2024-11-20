import {
  TextInput,
  StyleSheet,
  View,
  Text,
  DimensionValue,
} from "react-native";
import { theme } from "@/theme";
import { useState } from "react";

interface IInputProps {
  style?: any;
  width?: DimensionValue;
  height?: DimensionValue;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
  fontSize?: number;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url";
  borderRadius?: number;
  onChangeText: any;
  value?: any;
  placeholder?: string;
  borderWidth?: number;
  borderColor?: string;
  label?: string;
  editable?: boolean;
}

function Input(props: IInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputStyle: any = StyleSheet.create({
    ...props?.style,
    width: "100%",
    display: "flex",
    alignSelf: "center",
    height: props?.height || 42,
    borderRadius: props?.style?.borderRadius || 50,
    borderWidth: props?.borderWidth || 1,
    borderColor:
      props?.borderColor || isFocused ? theme.colors[500] : theme.colors[950],
    fontSize: props?.fontSize || 14,
    paddingHorizontal: 16,
  });

  return (
    <View
      style={{
        width: props?.width || "90%",
        display: "flex",
        alignSelf: "center",
        marginLeft: props?.marginLeft || 0,
        marginTop: props?.marginTop || 0,
        marginBottom: props?.marginBottom || 0,
        marginRight: props?.marginRight || 0,
      }}
    >
      {props.label ? (
        <Text
          style={{
            marginBottom: 8,
            color: theme.colors[950],
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {props?.label}
        </Text>
      ) : null}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          editable={props?.editable || true}
          onChangeText={props?.onChangeText}
          style={inputStyle}
          value={props?.value}
          keyboardType={props?.keyboardType || "default"}
          placeholder={props?.placeholder}
          placeholderTextColor={"#dde6e8"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
}

export default Input;
