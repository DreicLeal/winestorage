import { Box, HStack, Image, View, VStack } from "native-base";
import { Linking } from "react-native";
import { WineDTO } from "src/dtos/WineDTO";
import { Text } from "native-base";
import { Button } from "./Button";
import { useWinesStorage } from "src/hooks/useWineStorage";
import { Swipeable } from "react-native-gesture-handler";
import { useState } from "react";

export const WineCard = ({
  name,
  region,
  storage,
  type,
  id,
  supplier,
  ...rest
}: WineDTO) => {
  const { onAdd, onSubtract, deleteWine } = useWinesStorage();
  const [supplierInfo, setSupplierInfo] = useState(false);

  const leftSwipe = () => {
    return (
      <Button
        title="Deletar"
        onPress={() => deleteWine(id!)}
        marginLeft={2}
        bg={"red.500"}
        width={"20%"}
        height={"94%"}
        rounded={"md"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      />
    );
  };

  const PhoneNumber = ({ number }: { number: string }) => {
    const handlePress = () => {
      Linking.openURL(`tel:${number}`);
    };

    return <Text onPress={handlePress}>{number}</Text>;
  };

  return (
    <View>
      <Swipeable renderLeftActions={leftSwipe}>
        <Box
          bg={"gray.300"}
          marginRight={2}
          marginLeft={2}
          p={2}
          pr={10}
          alignItems={"center"}
          rounded={"md"}
          mb={2}
          {...rest}
        >
          <HStack>
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
                <Button
                  h={"12"}
                  w={"12"}
                  title="+"
                  onPress={() => onAdd(id!)}
                />
              </HStack>
            </VStack>
          </HStack>
          <Button
            alignSelf={"flex-start"}
            marginTop={"2"}
            rounded={"md"}
            p={"0"}
            h={"container"}
            w={"24"}
            title="ver mais"
            onPress={() => setSupplierInfo(!supplierInfo)}
          />
          {supplierInfo && (
            <View
              rounded={"md"}
              m={2}
              p={4}
              bgColor={"gray.200"}
              alignSelf={"flex-start"}
            >
              <Text fontSize={"xl"} fontWeight={"bold"}>Informações do fornecedor</Text>
              <Text fontSize={"xl"}>Empresa:{supplier.company}</Text>
              <Text fontSize={"xl"}>Nome: {supplier.seller}</Text>
              <Text fontSize={"xl"}>Contacto: 
                <PhoneNumber number={supplier.contact} />
              </Text>
            </View>
          )}
        </Box>
      </Swipeable>
    </View>
  );
};
