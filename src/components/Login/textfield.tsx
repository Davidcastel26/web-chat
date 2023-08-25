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
    props: {
        name:any
        placeholder:string
        autoComplete:string
        type:string
    }
}

export const Textfield: React.FC<TextFiledProps> = (
    {
        label,
        ...props
    }
) => {
  
    const [field, meta] = useField(props)

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
        <FormLabel>{label}</FormLabel>
        <Input as={Field} {...field} {...props}/>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}


/*
<FormControl isInvalid={formik.errors.username && formik.touched.username}>
                    <FormLabel fontSize="lg"> Username </FormLabel>
                    <Input 
                        // name='username' 
                        placeholder='Enter username'
                        autoComplete='off'
                        size="lg"
                        // value={formik.values.username }
                        // onChange={ formik.handleChange }
                        // onBlur={ formik.handleBlur }
                        {...formik.getFieldProps("username")}
                    />
                    <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>
*/