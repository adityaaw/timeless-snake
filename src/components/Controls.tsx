import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { ThemeColors } from "../styles/colors";
import { useContext } from "react";
import { GameContext } from "./GameContext";

type ControlProps = {
  reloadGame: () => void;
  pauseGame: () => void;
  isPaused: boolean;
  isGameOver: boolean;
};

export default function Controls({
  reloadGame,
  pauseGame,
  isPaused,
  isGameOver,
}: ControlProps) {
  const { theme } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.cta, { borderColor: theme.tertiary }]}
        onPress={reloadGame}
      >
        <Text style={[styles.text, { color: theme.text }]}>RESET</Text>
      </TouchableOpacity>

      {!isGameOver && (
        <>
          <View style={{ marginHorizontal: 5 }} />

          <TouchableOpacity
            style={[styles.cta, { borderColor: theme.tertiary }]}
            onPress={pauseGame}
          >
            <Text style={[styles.text, { color: theme.text }]}>
              {isPaused ? "RESUME" : "PAUSE"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 10,
    fontFamily: "Pixeled",
    color: ThemeColors.classic1998.text,
  },
  cta: {
    flex: 1,
    borderWidth: 4,
    borderColor: ThemeColors.classic1998.tertiary,
    padding: 10,
    alignItems: "center",
  },
});
