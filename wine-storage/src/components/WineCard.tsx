import { HStack, Image, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { WineDTO } from "src/dtos/WineDTO";
import { Text } from "native-base";
import { Button } from "./Button";
import { useWinesStorage } from "src/hooks/useWineStorage";

type Props = TouchableOpacityProps & WineDTO;

export const WineCard = ({
  name,
  region,
  storage,
  type,
  id,
  ...rest
}: Props) => {
  const { wineList, setWineList, onAdd, onSubtract } = useWinesStorage();

  return (
    <TouchableOpacity {...rest}>
      <HStack
        justifyContent={"space-between"}
        bg={"gray.500"}
        p={4}
        pr={10}
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
          <Text fontSize={"lg"} fontWeight={"bold"}>{name}</Text>
          <Text>{region}</Text>
          <Text>{type}</Text>
        </VStack>
        <VStack alignItems={"center"}>
          <Text>{storage}</Text>
          <HStack w={14} h={14}>
            <Button title="subctract" onPress={() => onSubtract(id)} />
            <Button title="add" onPress={() => onAdd(id)} />
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};
