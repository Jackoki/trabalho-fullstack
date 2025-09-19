import { createContext, useReducer } from "react";

const initialState = {
  countries: [],
  query: "",
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_COUNTRIES":
      return { ...state, countries: action.payload, loading: false, error: null };
    case "SET_ERROR":
      return { ...state, countries: [], loading: false, error: action.payload };
    default:
      return state;
  }
}

export const CountriesContext = createContext();

export function CountriesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CountriesContext.Provider value={{ state, dispatch }}>
      {children}
    </CountriesContext.Provider>
  );
}
