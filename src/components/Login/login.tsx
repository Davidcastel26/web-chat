import { useState } from 'react'
import {useNavigate} from 'react-router'

import { 
        VStack, 
        ButtonGroup,
        Heading,  
        Button, 
        Text} from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import { Textfield } from '../ui/textfield'
import { formSchema4Login } from '../../../common-formSchema'
import { useAccountContext } from '../../hooks/AccountContext'

export const Login = () => {

    const { setUser } = useAccountContext()
    const [ errorSigUp, setErrorSigUp ] = useState< null | any>(null)
    const navigate = useNavigate()

    const submitt = (values:any, actions:any) => {

        // console.log('submiteand al gran puta pero en minusculas');

        const vals = {...values}
            actions.resetForm()
            fetch("http://localhost:8080/auth/login", {
                method: "POST",
                credentials:"include",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(vals)
            }).catch( err => {
                console.log(err);
                return
            }).then(res => {
                if(!res || !res.ok || res.status >= 400){
                    return
                }
                return res.json()
            })
            .then(data => { 
                if(!data) return;

                setUser({...data})

                if(data.status){
                    setErrorSigUp(data.status)
                }else if( data.loggedIn){
                    // console.log(data);
                    navigate('/home')
                }
            })
    }

  return (
    <Formik 
        initialValues={{ name: "", password:""}}
        validationSchema={ formSchema4Login }
        onSubmit={submitt}
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
            <Text as="p" color="red.500"> { errorSigUp }</Text>
            <Textfield label="Username" name="name" placeholder="Enter username" autoComplete="off" type="text" />
            <Textfield label="Password" name="password" placeholder="Enter password" autoComplete="off" type="password" />

            <ButtonGroup>
                <Button type='submit' colorScheme='teal'>Log In</Button>
                <Button onClick={() => navigate("/register")} >Create Account</Button>
            </ButtonGroup>
        </VStack>

    

    </Formik>
  )
}
