
import { 
        VStack, 
        ButtonGroup,
        Heading,  
        Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { Textfield } from './textfield'
import {useNavigate} from 'react-router'

export const Login = () => {

    const navigate = useNavigate()

  return (
    <Formik 
        initialValues={{ username: "", password:""}}
        validationSchema={Yup.object({
        username: Yup.string()
            .required("Username required!")
            .min(6,"username too short!")
            .max(28, "username too long!"),
        password: Yup.string()
            .required("Password required.")
            .min(5, "password too short.")
            .max(20, "password to long")
        })}
        onSubmit={(values:any, actions:any) => {
            alert(JSON.stringify(values, null, 2))
            actions.resetForm()
        }}
    >

        <VStack 
            as={Form} 
            w={{base: "90%", md: "500px"}} 
            m="auto" 
            justify="center" 
            h="100vh"
            spacing="1rem"
        >
            <Heading> Log In</Heading>

            <Textfield label="Username" name="username" placeholder="Enter username" autoComplete="off" type="text" />
            <Textfield label="Password" name="password" placeholder="Enter password" autoComplete="off" type="password" />

            <ButtonGroup>
                <Button type='submit' colorScheme='teal'>Log In</Button>
                <Button onClick={() => navigate("/register")} >Create Account</Button>
            </ButtonGroup>
        </VStack>

    

    </Formik>
  )
}
