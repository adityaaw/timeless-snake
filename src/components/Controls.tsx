import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { ThemeColors } from "../styles/colors";

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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cta} onPress={reloadGame}>
        <Text style={styles.text}>RESET</Text>
      </TouchableOpacity>

      {!isGameOver && (
        <>
          <View style={{ marginHorizontal: 5 }} />

          <TouchableOpacity style={styles.cta} onPress={pauseGame}>
            <Text style={styles.text}>{isPaused ? "RESUME" : "PAUSE"}</Text>
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
