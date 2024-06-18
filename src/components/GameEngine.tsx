import { StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { ThemeColors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Controls from "./Controls";
import Score from "./Score";
import Snake from "./Snake";
import Food from "./Food";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import {
  randomFoodPosition,
  checkEatsFood,
  checkGameOver,
} from "../utils/utils";
import {
  FOOD_INITIAL_POSITION,
  GAME_BOUNDS,
  MOVE_INTERVAL,
  SCORE_INCREMENT,
  SNAKE_INITIAL_POSITION,
} from "../constants/constants";

const GameEngine = () => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameBounds, setGameBounds] = useState(GAME_BOUNDS);

  const moveSnake = useCallback(() => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; // create a new head object to avoid mutating the original head

    // GAME OVER
    if (checkGameOver(snakeHead, gameBounds)) {
      setIsGameOver((prev) => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(gameBounds.xMax, gameBounds.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  }, [direction, food, gameBounds, score, snake]);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused, moveSnake]);

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  const onHandleGestureEvent = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    const maxX = width?.toString().slice(0, 2);
    const maxY = height?.toString().slice(0, 2);

    if (maxX && maxY) {
      if (maxX > GAME_BOUNDS.xMax || maxY > GAME_BOUNDS.yMax) {
        setGameBounds({
          xMin: 0,
          xMax: maxX - 2,
          yMin: 0,
          yMax: maxY - 2,
        });
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onHandleGestureEvent}>
      <SafeAreaView style={styles.container}>
        <Score score={score} isPaused={isPaused} isGameOver={isGameOver} />
        <View style={styles.boundaries} onLayout={onLayout}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
        <Controls
          reloadGame={reloadGame}
          pauseGame={pauseGame}
          isPaused={isPaused}
          isGameOver={isGameOver}
        />
      </SafeAreaView>
    </PanGestureHandler>
  );
};

export default GameEngine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.classic1998.background,
  },
  boundaries: {
    flex: 1,
    borderColor: ThemeColors.classic1998.tertiary,
    borderWidth: 4,
    margin: 10,
  },
});
