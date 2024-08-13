import { useContext } from "react";

import { WinesContext } from "src/context/WinesContext";

export const useWinesStorage = () => {
  const context = useContext(WinesContext);

  return context;
};
