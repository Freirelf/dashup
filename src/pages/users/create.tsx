import { Box, Button, Divider, Flex, HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";

import { useForm, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutation } from "react-query";

import { Input } from "@/components/Form/Input";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatória"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória").min(6, "No minímo 6 caracteres"),
  password_confirmation: yup.string().test('password-match', 'As senhas precisam ser iguais', function (value) {
    return value === this.parent.password;
  }),
})


export default function createUser(){
  const router = useRouter()
 
  const createUser = useMutation(async (user:CreateUserFormData ) => {
    const response = await api.post('users', {
      user: {
        ...user,
        create_at: new Date(),
      
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  })

  const { register, handleSubmit, formState, formState: {errors} } = useForm({
    resolver: yupResolver(createUserFormSchema)     
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6"> 
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6","8"]}
          onSubmit={handleSubmit(handleCreateUser)}
          >
          <Heading size="lg" fontWeight="normal"> Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                register={register} 
                error={errors.name}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                register={register} 
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                register={register} 
                error={errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação de senha"
                register={register} 
                error={errors.password_confirmation}
              />
            </SimpleGrid>

          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link legacyBehavior href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha"> Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="teal"
                isLoading={formState.isSubmitting}
                >
                Salvar
              </Button>
            </HStack>
      
          </Flex>


        </Box>
      </Flex>
    </Box>
  )
}