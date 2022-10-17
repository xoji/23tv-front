import {Axios} from "../services";
import { createContext, useContext, useEffect, useState } from "react";
const Context = createContext();

const AuthorizetionProvider = ({ children }) => {
  const [state, setState] = useState(null);

  async function Auth() {
    try {
        if (localStorage.getItem("Authorization")) {
          Axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization") || ""
          const res = await Axios.get("/user-data")
          setState(res.data.data)
        }
    } catch (error) {
      setState(error.response && error.response.status)
    }
  }

  useEffect(() => {
    Auth();
  }, []);

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

const useAuth = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { AuthorizetionProvider, useAuth };
