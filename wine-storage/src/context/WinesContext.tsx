import { createContext, useState } from "react";
import { WineDTO } from "src/dtos/WineDTO";

export type WinesContextDataProps = {
  wineList: WineDTO[];
  setWineList: React.Dispatch<React.SetStateAction<WineDTO[]>>;
  onAdd:(id: string) => void
  onSubtract:(id: string) => void
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
      id: "1",
      name: "palato",
      supplier: "nineWines",
      region: "dão",
      type: "white",
      storage: 4,
    },
    {
      id: "2",
      name: "contraste",
      supplier: "nineWines",
      region: "douro",
      type: "white",
      storage: 2,
    },
  ]);

  const onAdd = (id:string) => {
setWineList(prevList =>
  prevList.map(wine => wine.id === id? {...wine, storage:wine.storage+1}: wine)
)
  }

  const onSubtract =(id: string) => {
setWineList(prevList => prevList.map(wine => wine.id === id ? {...wine, storage:wine.storage-1}: wine))
  }

  return (
    <WinesContext.Provider value={{ wineList, setWineList, onAdd, onSubtract }}>
      {children}
    </WinesContext.Provider>
  );
};
