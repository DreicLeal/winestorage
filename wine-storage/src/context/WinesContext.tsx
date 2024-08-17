import { storageWineGet, storageWineSave } from "@storage/storageWines";
import { createContext, useEffect, useState, useCallback } from "react";
import { WineDTO } from "src/dtos/WineDTO";
import uuid from "react-native-uuid";

export type WinesContextDataProps = {
  winesList: WineDTO[];
  setWinesList: React.Dispatch<React.SetStateAction<WineDTO[]>>;
  onAdd: (id: string) => void;
  onSubtract: (id: string) => void;
  newWineInclusion: (wineToAdd: WineDTO) => Promise<void>;
  deleteWine: (id: string) => Promise<void>;
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
  const [winesList, setWinesList] = useState<WineDTO[]>([]);

  const loadWineData = useCallback(async () => {
    try {
      const storageWinesList: WineDTO[] = await storageWineGet();
      setWinesList(storageWinesList);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    loadWineData();
  }, [loadWineData]);

  const saveWineList = useCallback(async (updatedList: WineDTO[]) => {
    try {
      await storageWineSave(updatedList);
    } catch (error) {
      console.error("Failed to save wine data:", error);
    }
  }, []);

  const onAdd = useCallback(
    async (id: string) => {
      setWinesList((prevList) => {
        const updatedList = prevList.map((wine) =>
          wine.id === id ? { ...wine, storage: wine.storage + 1 } : wine
        );
        saveWineList(updatedList);
        return updatedList;
      });

      await storageWineSave(winesList);
    },
    [saveWineList]
  );

  const onSubtract = useCallback(
    async (id: string) => {
      setWinesList((prevList) => {
        const updatedList = prevList.map((wine) => {
          if (wine.id === id) {
            const newStorage = Math.max(wine.storage - 1, 0);
            return { ...wine, storage: newStorage };
          }
          return wine;
        });
        saveWineList(updatedList);
        return updatedList;
      });
    },
    [saveWineList]
  );

  const newWineInclusion = useCallback(
    async (wineToAdd: WineDTO) => {
      const newWine = { ...wineToAdd, id: uuid.v4() as string };

      setWinesList((prevList) => {
        const updatedList = [newWine, ...prevList];
        saveWineList(updatedList);
        return updatedList;
      });
    },
    [saveWineList]
  );

  const deleteWine = useCallback(
    async (id: string) => {
      setWinesList((prevList) => {
        const updatedList = prevList.filter((wine) => wine.id !== id);
        saveWineList(updatedList);
        return updatedList;
      });
    },
    [saveWineList]
  );

  return (
    <WinesContext.Provider
      value={{
        winesList,
        setWinesList,
        onAdd,
        onSubtract,
        newWineInclusion,
        deleteWine,
      }}
    >
      {children}
    </WinesContext.Provider>
  );
};
