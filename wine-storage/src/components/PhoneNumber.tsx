import { Text } from "native-base";
import { Linking } from "react-native";

export const PhoneNumber = ({ number }: { number: string }) => {
    const handlePress = () => {
      Linking.openURL(`tel:${number}`);
    };

    return <Text textDecorationLine={"underline"} color={"blue.600"} onPress={handlePress}>{number}</Text>;
  };