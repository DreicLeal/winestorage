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
      name: "Palato",
      supplier: "Decante",
      region: "Dão",
      type: "Branco",
      storage: 4,
    },
    {
      id: "2",
      name: "Contraste",
      supplier: "NineWines",
      region: "Douro",
      type: "Tinto",
      storage: 2,
    },
    {
      id: "3",
      name: "Kompassus",
      supplier: "NineWines",
      region: "Douro",
      type: "Branco",
      storage: 2,
    },
    {
      id: "4",
      name: "Allo",
      supplier: "NineWines",
      region: "Douro",
      type: "branco",
      storage: 2,
    },
    {
      id: "5",
      name: "Regueiro",
      supplier: "NineWines",
      region: "Douro",
      type: "Tinto",
      storage: 2,
    },
    {
      id: "6",
      name: "Quinta da Giesta",
      supplier: "NineWines",
      region: "Douro",
      type: "Tinto",
      storage: 2,
    },
    {
      id: "7",
      name: "Calheiros Cruz",
      supplier: "NineWines",
      region: "Douro",
      type: "Tinto",
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
