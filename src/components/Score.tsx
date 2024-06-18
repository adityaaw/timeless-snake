import { Text, StyleSheet, View } from "react-native";
import { ThemeColors } from "../styles/colors";

type ScoreProps = {
  score: number;
  isPaused: boolean;
  isGameOver: boolean;
};

export default function Score({ score, isPaused, isGameOver }: ScoreProps) {
  const gameState = () => {
    if (isPaused) {
      return "PAUSED";
    }
    if (isGameOver) {
      return "GAME OVER";
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{gameState()}</Text>
        <Text style={styles.text}>{score}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 0,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    fontFamily: "Pixeled",
    color: ThemeColors.classic1998.text,
  },
  divider: {
    borderColor: ThemeColors.classic1998.tertiary,
    borderWidth: 2,
    marginTop: 5,
  },
});
