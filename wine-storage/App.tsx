import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { WineCard } from "@components/WineCard";
import { NativeBaseProvider } from "native-base";
import { THEME } from "src/themes";
const wineInfo = {
  name: "palato",
  supplier: "nineWines",
  region: "bairrada",
  type: "white",
  storage: 2,
};
export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <WineCard data={wineInfo} />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
