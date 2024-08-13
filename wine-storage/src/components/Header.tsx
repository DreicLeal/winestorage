import { Center, Heading, Text } from "native-base";

export const Header = () => {
  return (
    <Center bgColor={"gray.600"} pt={16} pb={5} marginBottom={5}>
      <Heading color={"gray.100"} fontSize={"xl"} fontFamily={"heading"}>
        Wines StockFlow and suply
      </Heading>
    </Center>
  );
};
