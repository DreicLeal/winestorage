import { Group } from "@components/Group";
import { Header } from "@components/Header";
import { WineCard } from "@components/WineCard";
import { debounce } from "lodash";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, Input, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { useWinesStorage } from "src/hooks/useWineStorage";

export const Home = () => {
  const { winesList, setWinesList } = useWinesStorage();
  const [typeFilter, setTypeFilter] = useState(winesList);
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [typeSelected, setTypeSelected] = useState<string>("Todos");
  const [search, setSearch] = useState("");

  const wTypes = winesList.map((wines) => wines.type);
  const uniqueTypes = wTypes.filter((wine, i) => wTypes.indexOf(wine) === i);

  useEffect(() => {
    setWineTypes(["Todos", ...uniqueTypes]);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (typeSelected === "Todos") {
        setTypeFilter(winesList);
      } else {
        setTypeFilter(winesList.filter((wine) => wine.type === typeSelected));
      }
    }, [typeSelected, winesList])
  );

  const handleSearch = useCallback(
    (query: string) => {
      if (query !== "") {
        const filteredList = winesList.filter((wine) =>
          wine.name.toLowerCase().includes(query.toLowerCase())
        );
        setTypeFilter(
          typeSelected === "Todos"
            ? filteredList
            : filteredList.filter((wine) => wine.type === typeSelected)
        );
      } else {
        setTypeFilter(
          typeSelected === "Todos"
            ? winesList
            : winesList.filter((wine) => wine.type === typeSelected)
        );
      }
    },
    [winesList, typeSelected]
  );

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  return (
    <VStack>
      <Header />
      <Input
        placeholder="Busca"
        value={search}
        onChangeText={setSearch}
        bgColor={"gray.700"}
        color={"gray.100"}
        fontSize={"md"}
        variant={"filled"}
        width={"100%"}
        rounded={"md"}
        _focus={{
          borderColor: "gray.500",
        }}
      />
      <FlatList
        data={wineTypes}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              typeSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setTypeSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 5 }}
        my={5}
        minH={10}
        maxH={10}
      />
      <FlatList
        data={typeFilter}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <WineCard
            name={item.name}
            region={item.region}
            type={item.type}
            storage={item.storage}
            id={item.id}
            supplier={item.supplier}
          />
        )}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ paddingBottom: 24 }}
      />
    </VStack>
  );
};
