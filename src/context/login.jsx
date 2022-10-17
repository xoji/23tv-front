import { createContext, useContext, useState } from "react";

const Context = createContext();

function LoginProvider({ children }) {
  const [state, setState] = useState({
    user: {
      phone: "",
      username: "",
      age: "",
      password: "",
      code: "",
      newPassword: "",
    },
    isloading: false,
    error: {
      isError: false,
      message: null,
    },
    signUp: "",
    recovery: "",
    accessToken: localStorage.getItem("Authorization"),
  });

  const value = {
    state,
    setState,
  };

  return (
    <Context.Provider value={value}>
      <Context.Consumer>{() => children}</Context.Consumer>
    </Context.Provider>
  );
}

const useLogin = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { LoginProvider, useLogin };
