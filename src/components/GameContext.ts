import { Theme, ThemeColors } from "./../styles/colors";
import React from "react";

type GameContextProps = {
  theme: Theme;
  setTheme?: React.Dispatch<React.SetStateAction<Theme>>;
};

export const GameContext = React.createContext<GameContextProps>({
  theme: ThemeColors.classic1998,
});
