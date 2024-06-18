import { StyleSheet, View } from "react-native";
import { Coordinate } from "../types/types";
import { ThemeColors } from "../styles/colors";

export default function Food({ x, y }: Coordinate) {
  return <View style={[{ top: y * 10, left: x * 10 }, styles.food]} />;
}

const styles = StyleSheet.create({
  food: {
    width: 12,
    height: 12,
    borderRadius: 8,
    position: "absolute",
    backgroundColor: ThemeColors.classic1998.secondary,
  },
});
