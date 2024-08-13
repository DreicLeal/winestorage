import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { NativeBaseProvider } from "native-base";
import { THEME } from "src/themes";
import React from "react";
import { WinesContextProvider } from "src/context/WinesContext";
import { Loading } from "@components/Loading";
// import { Home } from "@screens/Home";
import { AddWinesForm } from "@screens/AddWinesform";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <WinesContextProvider>
        {fontsLoaded ? <AddWinesForm /> : <Loading />}
      </WinesContextProvider>
    </NativeBaseProvider>
  );
}
