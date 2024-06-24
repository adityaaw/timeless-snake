import { StyleSheet, View } from "react-native";
import { Coordinate } from "../types/types";
import { ThemeColors } from "../styles/colors";
import { GameContext } from "./GameContext";
import { useContext } from "react";

export default function Food({ x, y }: Coordinate) {
  const { theme } = useContext(GameContext);
  return (
    <View
      style={[
        { top: y * 10, left: x * 10 },
        styles.food,
        { backgroundColor: theme.secondary },
      ]}
    />
  );
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
