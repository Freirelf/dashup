import { Input as ChackraInput, FormLabel, FormControl, InputProps as ChackraInputProps, FormErrorMessage } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form'

 
interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
  register: any; 
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, register, error= null, ...rest }, ref) => {
  return ( 
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}> {label} </FormLabel>} 
      <ChackraInput
        name={name}
        id={name}
        focusBorderColor='teal.500'
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        ref={ref}
        {...register(name)}
        {...rest}
      />

      { !!error && ( 
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)