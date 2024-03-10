import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { colors, fontSize, spacing } from "./theme";

interface Props {
  title: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  color = colors.red,
  textColor = colors.white,
  onPress,
  style,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.button, { backgroundColor: color }, style]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    paddingVertical: spacing.medium,
    borderRadius: spacing.medium,
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: fontSize.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
});
