import { storageWineGet, storageWineSave } from "@storage/storageWines";
import { createContext, useEffect, useState } from "react";
import { WineDTO } from "src/dtos/WineDTO";

export type WinesContextDataProps = {
  winesList: WineDTO[];
  setWinesList: React.Dispatch<React.SetStateAction<WineDTO[]>>;
  onAdd: (id: string) => void;
  onSubtract: (id: string) => void;
  newWineInclusion: (wineToAdd: WineDTO) => Promise<void>
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
  //   {
  //     id: "1",
  //     name: "Palato",
  //     supplier: "Decante",
  //     region: "Dão",
  //     type: "Branco",
  //     storage: 4,
  //   },
  //   {
  //     id: "2",
  //     name: "Contraste",
  //     supplier: "NineWines",
  //     region: "Douro",
  //     type: "Tinto",
  //     storage: 2,
  //   },
  //   {
  //     id: "3",
  //     name: "Kompassus",
  //     supplier: "NineWines",
  //     region: "Douro",
  //     type: "Branco",
  //     storage: 2,
  //   },
  //   {
  //     id: "4",
  //     name: "Allo",
  //     supplier: "NineWines",
  //     region: "Douro",
  //     type: "branco",
  //     storage: 2,
  //   },
  //   {
  //     id: "5",
  //     name: "Regueiro",
  //     supplier: "NineWines",
  //     region: "Douro",
  //     type: "Tinto",
  //     storage: 2,
  //   },
  //   {
  //     id: "6",
  //     name: "Quinta da Giesta",
  //     supplier: "NineWines",
  //     region: "Douro",
  //     type: "Rosé",
  //     storage: 2,
  //   },
  //   {
  //     id: "7",
  //     name: "Calheiros Cruz",
  //     supplier: "NineWines",
  //     region: "Douro",
  //     type: "Tinto",
  //     storage: 2,
  //   },
  //   {
  //     id: "8",
  //     name: "Opta",
  //     supplier: "NineWines",
  //     region: "Douro",
  //     type: "Espumante",
  //     storage: 2,
  //   },
  // ]);

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
        wine.id === id ? { ...wine, storage: wine.storage + 1 } : wine
      )
    );
    await storageWineSave(winesList);
  };

  const onSubtract = async (id: string) => {
    setWinesList((prevList) =>
      prevList.map((wine) =>
        wine.id === id ? { ...wine, storage: wine.storage - 1 } : wine
      )
    );
    await storageWineSave(winesList);
  };

  const newWineInclusion = async (wineToAdd: WineDTO) => {
    const newId = winesList[winesList.length - 1].id;
    wineToAdd.id = 1 + newId.toString();
    setWinesList([wineToAdd, ...winesList]);
    await storageWineSave(winesList)
  };

  return (
    <WinesContext.Provider
      value={{ winesList, setWinesList, onAdd, onSubtract, newWineInclusion }}
    >
      {children}
    </WinesContext.Provider>
  );
};
