import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";

type SignFormData = {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required('O E-mail é um campo obrigatório').email('Por favor, digite um e-mail valido'),
  password: yup.string().required('A Senha é um campo obrigatório'),
})

export default function SignIn() {
  const router = useRouter();
  const { register, handleSubmit, formState, formState: { errors } } = useForm<SignFormData>({
    resolver: yupResolver(schema)
  });

  const handleSignIn: SubmitHandler<SignFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);

    router.push('/dashboard');
  }

  return (
    <Flex width="100vw" height="100vh" justify="center" align="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        background="gray.800"
        p="2rem"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
