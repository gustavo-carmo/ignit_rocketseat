import {
  Box,
  Button,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const schema = yup.object({
  name: yup.string().required('O Nome é um campo obrigatório'),
  email: yup.string().required('O E-mail é um campo obrigatório').email('Por favor, digite um e-mail valido'),
  password: yup.string().required('A Senha é um campo obrigatório'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas não são iguais')
})

export default function CreateUser() {
  const { handleSubmit, formState, formState: { errors }, register } = useForm<CreateUserData>({
    resolver: yupResolver(schema)
  });

  const handleCreate: SubmitHandler<CreateUserData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" onSubmit={handleSubmit(handleCreate)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                label="Confirmação da senha"
                type="password"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button colorScheme="pink" type="submit" isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
