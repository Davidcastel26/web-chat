import { 
    VStack, 
    ButtonGroup, 
    Heading,
    Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
// import * as Yup from "yup"
import { Textfield } from './textfield'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router';
import { formSchema } from '../../../common-formSchema'

export const Sigup = () => {

    const navigate = useNavigate()

    return (
        <Formik 
            initialValues={{ username: "", password:""}}
            validationSchema={formSchema}
            onSubmit={(values:any, actions:any) => {
                const vals = {...values}
                actions.resetForm()
                fetch("http://localhost:8080/auth/register", {
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
                    if(!data) return
                    console.log(data);
                })
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
        <Heading> Sig Up</Heading>

            <Textfield label="Username" name="username" placeholder="Enter username" autoComplete="off" type="text" />
            <Textfield label="Password" name="password" placeholder="Enter password" autoComplete="off" type="password" />

            <ButtonGroup>
                <Button type='submit' colorScheme='teal'>Create Account</Button>
                <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}> Back</Button>
            </ButtonGroup>
        </VStack>
    </Formik>
)}
