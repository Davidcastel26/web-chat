// import {IntrinsicAttributes} from 'react'
import {
    Field,
    useField} from "formik"
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'

interface TextFiledProps {
    label: string
    name:string
    placeholder:string
    autoComplete:string
    type:string
}

export const Textfield: React.FC<TextFiledProps> = (
    {
        label,
        // ...props 
        name,
        placeholder,
        autoComplete,
        type
    }
) => {
  
    const [field, meta] = useField(name)

    const isBooleand = meta.touched && meta.error ? true : false

  return (
    <FormControl isInvalid={isBooleand}>
        <FormLabel>{label}</FormLabel>
        {/* <Input as={Field} {...field} {...props}/> */}
        <Input 
            as={Field} 
            {...field} 
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            type={type}
        />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}