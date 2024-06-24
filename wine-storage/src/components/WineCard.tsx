import { HStack, Image } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { WineDTO } from "src/dtos/WineDTO";
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
        <Image
          source={require("@assets/wine-bottle.svg")}
          w={110}
          h={110}
          alt="alt da imagem"
        />
        <Text>{data.name}</Text>
        <Text>{data.region}</Text>
      </HStack>
    </TouchableOpacity>
  );
};
