import { Header } from "@components/Header";
import { WineCard } from "@components/WineCard";
import { FlatList, VStack } from "native-base";
import { useWinesStorage } from "src/hooks/useWineStorage";

export const Home = () => {
  const { winesList } = useWinesStorage();
  return (
    <VStack>
      <Header />
      <FlatList
        data={winesList}
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
      />
    </VStack>
  );
};
