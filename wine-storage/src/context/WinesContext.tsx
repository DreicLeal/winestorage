import { storageWineGet, storageWineSave } from "@storage/storageWines";
import { createContext, useEffect, useState } from "react";
import { WineDTO } from "src/dtos/WineDTO";
import uuid from "react-native-uuid";

export type WinesContextDataProps = {
  winesList: WineDTO[];
  setWinesList: React.Dispatch<React.SetStateAction<WineDTO[]>>;
  onAdd: (id: string) => void;
  onSubtract: (id: string) => void;
  newWineInclusion: (wineToAdd: WineDTO) => Promise<void>;
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
  const [winesList, setWinesList] = useState<WineDTO[]>([
    
  ]);

  const loadWineData = async () => {
    try {
      const storageWinesList: WineDTO[] = await storageWineGet();
      setWinesList(storageWinesList);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadWineData();
  }, []);

  const onAdd = async (id: string) => {
    setWinesList((prevList) =>
      prevList.map((wine) =>
        wine.id === id ? { ...wine, storage: +wine.storage + 1 } : wine
      )
    );
    await storageWineSave(winesList);
  };

  const onSubtract = async (id: string) => {
    setWinesList((prevList) =>
      prevList.map((wine) =>
        wine.id === id ? { ...wine, storage: +wine.storage - 1 } : wine
      )
    );
    await storageWineSave(winesList);
  };

  const newWineInclusion = async (wineToAdd: WineDTO) => {
    const newId = uuid.v4() as string
    wineToAdd.id = newId;
    setWinesList([wineToAdd, ...winesList]);
    await storageWineSave(winesList);
  };

  return (
    <WinesContext.Provider
      value={{ winesList, setWinesList, onAdd, onSubtract, newWineInclusion }}
    >
      {children}
    </WinesContext.Provider>
  );
};
