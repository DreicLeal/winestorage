import { Header } from "@components/Header";
import { Center, Heading, ScrollView, VStack } from "native-base";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useWinesStorage } from "src/hooks/useWineStorage";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  region: string;
  type: string;
  storage: string;
  supplier: string;
};

const addWineSchema = yup.object().shape({
  name: yup.string().required(),
  region: yup.string().required(),
  type: yup.string().required(),
  storage: yup.string().required(),
  supplier: yup.string().required(),
});

export const AddWinesForm = () => {
  const { newWineInclusion } = useWinesStorage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(addWineSchema) });

  const onSubmit = (data: FormDataProps) => {
    newWineInclusion(data);
  };
  return (
    <VStack>
      <Header />
      <ScrollView>
        <VStack flex={1} px={10} bgColor={"amber.500"}>
          <Center>
            <Heading marginBottom={2}>Adicione um vinho</Heading>
          </Center>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="region"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Região"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.region?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="supplier"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Fornecedor"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.supplier?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Tipo"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.type?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="storage"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Quantidade"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.storage?.message}
              />
            )}
          />
          <Button
            title="Adicionar"
            variant={"solid"}
            onPress={handleSubmit(onSubmit)}
            marginBottom={2}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
