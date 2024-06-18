export type GestureEventType = {
  nativeEvent: { translationX: number; translationY: number };
};

export type Coordinate = {
  x: number;
  y: number;
};

export enum Direction {
  Right,
  Up,
  Left,
  Down,
}
