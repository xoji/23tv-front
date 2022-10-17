import { createContext, useContext, useState } from "react";

const Context = createContext();

const ShareLinkProvider = ({ children }) => {
  const [state, setState] = useState(false);

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

const useSharing = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { ShareLinkProvider, useSharing };
