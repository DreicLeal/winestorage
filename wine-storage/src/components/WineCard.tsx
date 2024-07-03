import { HStack, Image, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { WineDTO } from "src/dtos/WineDTO";
import { Text } from "native-base";
import { Button } from "./Button";

type Props = TouchableOpacityProps & {
  data: WineDTO[];
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
          source={require("@assets/wine-bottle.png")}
          w={24}
          h={24}
          alt="alt da imagem"
        />
        <VStack>
          <Text>{}</Text>
          <Text>{}</Text>
        </VStack>
        <VStack>
          <Text>{}</Text>
          <Button title="<"  />
          <Button title=">"  />
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};
