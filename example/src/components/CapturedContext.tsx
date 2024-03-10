import { PropsWithChildren, createContext, useReducer } from "react";
import { Pokemon } from "types";

export const CapturedContext = createContext<
  [Pokemon[], React.Dispatch<Action>]
>([[], () => {}]);

export function CapturedContextProvider({ children }: PropsWithChildren<{}>) {
  const reducer = useReducer(capturedReducer, []);

  return (
    <CapturedContext.Provider value={reducer}>
      {children}
    </CapturedContext.Provider>
  );
}

interface Action {
  type: "capture" | "release";
  pokemon: Pokemon;
}

function capturedReducer(captured: Pokemon[], action: Action) {
  switch (action.type) {
    case "capture": {
      return [...captured, action.pokemon];
    }
    case "release": {
      return captured.filter((pokemon) => pokemon.id !== action.pokemon.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
