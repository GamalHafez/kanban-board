import { createContext } from "react";

// Creating and exporting the DataContext with default values

export default createContext({
  data: [],
  setData: () => {}, // placeholder, does nothing
});
