import { Header } from "@components/Header";
import { Center, Heading, ScrollView, VStack } from "native-base";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useWinesStorage } from "src/hooks/useWineStorage";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "src/routes/app.routes";
import { WineDTO } from "src/dtos/WineDTO";
import { Platform, KeyboardAvoidingView } from "react-native";

const supplierSchema = yup.object().shape({
  company: yup.string().required("Campo Obrigatório"),
  seller: yup.string().required("Campo Obrigatório"),
  contact: yup.string().required("Campo Obrigatório"),
});

const addWineSchema = yup.object().shape({
  name: yup.string().required("Campo Obrigatório"),
  region: yup.string().required("Campo Obrigatório"),
  type: yup.string().required("Campo Obrigatório"),
  storage: yup
    .number()
    .required("Campo Obrigatório")
    .typeError("Deve ser um número"),
  supplier: supplierSchema,
});

export const AddWinesForm = () => {
  const navigation = useNavigation<AppNavigatorRoutesProp>();
  const { newWineInclusion } = useWinesStorage();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WineDTO>({
    resolver: yupResolver(addWineSchema),
    defaultValues: {
      name: "",
      region: "",
      type: "",
      storage: undefined,
      supplier: {
        company: "",
        seller: "",
        contact: "",
      },
    },
  });

  const onSubmit = (data: WineDTO) => {
    newWineInclusion(data);
    navigation.navigate("home");
    reset();
  };
  return (
    <VStack>
      <Header />

        <ScrollView
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 72 }}
        >
          <VStack space={2} px={10}>
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
                  onChangeText={(text) => onChange(Number(text))}
                  value={value !== undefined ? String(value) : ""}
                  keyboardType="numeric"
                  errorMessage={errors.storage?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="supplier.company"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Empresa"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.supplier?.company?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="supplier.seller"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Representante"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.supplier?.seller?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="supplier.contact"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Contato"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.supplier?.contact?.message}
                />
              )}
            />
            <Button
              title="Adicionar"
              variant={"solid"}
              onPress={handleSubmit(onSubmit)}
              height={16}
              marginBottom={2}
            />
          </VStack>
        </ScrollView>
    </VStack>
  );
};
