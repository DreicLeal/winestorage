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
  const { onAdd, onSubtract } = useWinesStorage();

  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg={"gray.300"}
        marginRight={2}
        marginLeft={2}
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
        <VStack w={"32"}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {name}
          </Text>
          <Text>{region}</Text>
          <Text>{type}</Text>
        </VStack>
        <VStack bgColor={"dark.900"} rounded={"md"} width={"32"} h={"24"}>
          <Text fontSize={"2xl"} alignSelf={"center"} fontWeight={"bold"}>
            {storage}
          </Text>
          <HStack w={"32"} justifyContent={"center"}>
            <Button
              h={"12"}
              w={"12"}
              padding={"1"}
              title="-"
              onPress={() => onSubtract(id!)}
            />
            <Button h={"12"} w={"12"} title="+" onPress={() => onAdd(id!)} />
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};
