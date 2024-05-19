import { createContext } from "react";

export const PokeAnimationContext = createContext<{ animationDisabled: boolean, setAnimationDisabled: (state: boolean) => void }>({
  animationDisabled: false,
  setAnimationDisabled: () => { }
})