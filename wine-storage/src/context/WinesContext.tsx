import { createContext, useState } from "react";
import { WineDTO } from "src/dtos/WineDTO";

export type WinesContextDataProps = {
  wineList: WineDTO[];
  setWineList: React.Dispatch<React.SetStateAction<WineDTO[]>>;
};

export const WinesContext = createContext<WinesContextDataProps>(
  {} as WinesContextDataProps
);

type WinesContextProviderProps = {
  children: React.ReactNode;
};

export const WinesContextProvider = ({
  children,
}: WinesContextProviderProps) => {
  const [wineList, setWineList] = useState<WineDTO[]>([
    {
      id: 1,
      name: "palato",
      supplier: "nineWines",
      region: "bairrada",
      type: "white",
      storage: 2,
    },
  ]);

  return (
    <WinesContext.Provider value={{ wineList, setWineList }}>
      {children}
    </WinesContext.Provider>
  );
};
