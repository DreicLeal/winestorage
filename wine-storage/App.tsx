import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { WineCard } from "@components/WineCard";
import { NativeBaseProvider } from "native-base";
import { THEME } from "src/themes";
import { Loading } from "@components/Loading";
import React from "react";
import { WinesContextProvider } from "src/context/WinesContext";
import { useWinesStorage } from "src/hooks/useWineStorage";

export default function App() {
  const {wineList} = useWinesStorage()
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <WinesContextProvider>
        {fontsLoaded ? <WineCard data={wineList} /> : <Loading />}
      </WinesContextProvider>
    </NativeBaseProvider>
  );
}
