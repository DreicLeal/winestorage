import { HStack, Image } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { WineDTO } from "src/dtos/WineDTO";
import wineImage from "src/assets/wine-bottle.svg";
import { Text } from "native-base";

type Props = TouchableOpacityProps & {
  data: WineDTO;
};

export const WineCard = ({ data, ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg={"gray.500"}
        p={2}
        pr={4}
        alignItems={"center"}
        rounded={"md"}
        mb={2}
      >
        <Text>{data.name}</Text>
        <Text>{data.region}</Text>
      </HStack>
    </TouchableOpacity>
  );
};
