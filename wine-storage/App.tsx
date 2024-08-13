import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { THEME } from "src/themes";
import React from "react";
import { WinesContextProvider } from "src/context/WinesContext";
import { Loading } from "@components/Loading";
import { AppRoutes } from "src/routes/app.routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <GestureHandlerRootView>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={"transparent"}
          translucent
        />
        <WinesContextProvider>
          {fontsLoaded ? <AppRoutes /> : <Loading />}
        </WinesContextProvider>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
