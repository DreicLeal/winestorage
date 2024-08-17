import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import ListSvg from "@assets/list.svg";
import AddSvg from "@assets/add.svg";
import { NavigationContainer } from "@react-navigation/native";
import { AddWinesForm } from "@screens/AddWinesform";

type AppRoutes = {
  home: undefined;
  winesForm: undefined;
};
export type AppNavigatorRoutesProp = BottomTabNavigationProp<AppRoutes>;
const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export const AppRoutes = () => {
  const { sizes, colors } = useTheme();
  const iconSizes = sizes[6];
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.green[500],
          tabBarInactiveTintColor: colors.gray[200],
          tabBarStyle: {
            height: Platform.OS === "android" ? "auto" : 96,
          },
        }}
      >
        <Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <ListSvg fill={color} width={32} height={32} />
            ),
          }}
        />
        <Screen
          name="winesForm"
          component={AddWinesForm}
          options={{
            tabBarIcon: ({ color }) => (
              <AddSvg fill={color} width={iconSizes} height={iconSizes} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
