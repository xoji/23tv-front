import { createContext, useContext, useState } from "react";

const Context = createContext();

const ThemeProvider = ({ children }) => {
  const [state, setState] = useState(
    parseInt(window.localStorage.getItem("dark_mode")) === 0 ? false : true
  );
  const [play, setPlay] = useState(true)

  const value = {
    state,
    setState,
    play,
    setPlay
  };
  return (
    <Context.Provider value={value}>
      <Context.Consumer>{() => children}</Context.Consumer>
    </Context.Provider>
  );
};

const useTheme = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};


const usePlay = (setterOnly) => {
  const { play, setPlay } = useContext(Context);
  return setterOnly ? [setPlay] : [play, setPlay];
};


export { ThemeProvider, useTheme, usePlay };
