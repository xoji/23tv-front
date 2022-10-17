import { createContext, useContext, useState } from "react";

const Context = createContext();

const PaginationProvider = ({ children }) => {
  const [state, setState] = useState(1)

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

const usePagination = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { PaginationProvider, usePagination }