// index.tsx
import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '@/components/Form/Input'
import { useForm, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
 
type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inváildo"),
  password: yup.string().required("Senha obrigatória")
})

export default function SignIn() {
  const { register, handleSubmit, formState, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  }); 

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve=> setTimeout(resolve, 2000))
    console.log(values)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100"
        maxWidth={360}
        bg="gray.800"
        p="8"   
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name='email'
            label='E-mail'
            type='email'
            register={register} 
            error={errors.email}
          />
          <Input
            name='password'
            label='Senha'
            type='password'
            register={register} 
            error={errors.password}
          />
        </Stack>
        <Button
          type='submit'
          mt="6"
          colorScheme="teal"
          size="lg"
          isLoading={formState.isSubmitting}
        >  Entrar
        </Button>
      </Flex>
    </Flex>
  )
}