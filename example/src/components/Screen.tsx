import { PropsWithChildren } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { colors } from "./theme";

interface Props extends PropsWithChildren {
  loading?: boolean;
}

const { height: screenHeight } = Dimensions.get("screen");

export function Screen({ loading = false, children }: Props) {
  const content = loading ? (
    <ActivityIndicator size="large" color={colors.red} style={styles.loading} />
  ) : (
    children
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>{content}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loading: {
    top: screenHeight / 2.5,
  },
});
