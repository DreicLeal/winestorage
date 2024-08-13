import AsyncStorage from "@react-native-async-storage/async-storage";
import { WineDTO } from "src/dtos/WineDTO";
import { WINE_STORAGE } from "./storageConfig";

export const storageWineSave = async (wines: WineDTO[]) => {
  await AsyncStorage.setItem(WINE_STORAGE, JSON.stringify(wines));
};

export const storageWineGet = async () => {
  const storage = await AsyncStorage.getItem(WINE_STORAGE);
  const winesList: WineDTO[] = storage
    ? JSON.parse(storage)
    : ([] as WineDTO[]);

  return winesList;
};
