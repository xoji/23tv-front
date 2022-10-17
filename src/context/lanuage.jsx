// import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../services";

const Context = createContext();

const LangProvider = ({ children }) => {
  const [state, setState] = useState(localStorage.getItem("lang") || 'ru')

  useEffect(() => {
    if (state) {
      localStorage.setItem("lang", state);
      Axios.defaults.headers.common["Language"] = state;
    } else {
      localStorage.setItem("lang", "ru");
      Axios.defaults.headers.common["Language"] = "ru"
    }
  }, [state]);

  const value = {
    state,
    setState,
  };

  return (
    <Context.Provider value={value}>
      <Context.Consumer>{() => children}</Context.Consumer>
    </Context.Provider>
  );
};

const useLang = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { LangProvider, useLang };
