import { Group } from "@components/Group";
import { Header } from "@components/Header";
import { WineCard } from "@components/WineCard";
import { FlatList, Input, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { useWinesStorage } from "src/hooks/useWineStorage";
import { WineDTO } from "src/dtos/WineDTO";

export const Home = () => {
  const { winesList } = useWinesStorage();

  const [typeFilter, setTypeFilter] = useState(winesList);
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [typeSelected, setTypeSelected] = useState<string>("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const wTypes = winesList.map((wines) => wines.type);
    const uniqueTypes = wTypes.filter((wine, i) => wTypes.indexOf(wine) === i);
    setWineTypes(["Todos", ...uniqueTypes]);
  }, [winesList]);

  const applyTypeFilter = useCallback(() => {
    if (typeSelected === "Todos") {
      return winesList;
    } else {
      return winesList.filter((wine) => wine.type === typeSelected);
    }
  }, [typeSelected, winesList]);

  const applySearchFilter = useCallback(
    (filteredWines: WineDTO[]) => {
      if (search !== "") {
        return (filteredWines = winesList.filter(
          (wine) =>
            wine.name.toLowerCase().includes(search.toLowerCase()) ||
            wine.type.toLowerCase().includes(search.toLowerCase()) ||
            wine.region.toLowerCase().includes(search.toLowerCase())
        ));
      }
      return filteredWines;
    },
    [search]
  );

  useEffect(() => {
    const typeFilteredWines = applyTypeFilter();
    const finalFilteredWines = applySearchFilter(typeFilteredWines);
    setTypeFilter(finalFilteredWines);
  }, [search, typeSelected, applySearchFilter, applyTypeFilter]);

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
        marginX={2}
        width={"container"}
        px={"2"}
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
