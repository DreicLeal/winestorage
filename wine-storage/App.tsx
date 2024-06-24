import { StatusBar, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { WineCard } from "@components/WineCard";
import { NativeBaseProvider } from "native-base";
import { THEME } from "src/themes";
import { Loading } from "@components/Loading";

const wineInfo = {
  name: "palato",
  supplier: "nineWines",
  region: "bairrada",
  type: "white",
  storage: 2,
};

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      {fontsLoaded ? <WineCard data={wineInfo} /> : <Loading />}
    </NativeBaseProvider>
  );
}
