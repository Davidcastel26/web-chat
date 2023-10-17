import { Modal, 
        ModalContent,
        ModalCloseButton,
        ModalBody, 
        ModalFooter, 
        ModalHeader } from '@chakra-ui/modal'
import { Button, 
        ModalOverlay,
        Heading } from '@chakra-ui/react'

import { AddFriendModalProps } from '../../interfaces/frinedsInterface'
import { Textfield } from './textfield'
import { Formik, Form, ErrorMessage } from 'formik'
import { friendSchema } from '../../../common-formSchema'
import { socket } from '../../socket'
import { useCallback, useContext, useState } from 'react'
import { FriendContext } from '../../Context/FriendsContext'

export const AddFriendModal= ({ isOpen, onClose}:AddFriendModalProps) => {    

    const [ error, setError ] = useState< [] | string>("")

    const closeModal = useCallback(
        () => {
            setError('')
            onClose()
        },[onClose]
    )

    const {friendList, setFriendList} = useContext(FriendContext)

    const submitFormFriend = (values:any, actions:any) => {
        // alert(JSON.stringify(values, null, 2))

        console.log(friendList)
        
        socket.emit(
            'client:add_friend', 
            values.name,
            ({errorMessage, done}:any) => {
                if(done){
                    setFriendList(() => [values.name, ...friendList])
                    closeModal()
                    return;
                }
                setError(errorMessage)
            }
        )
        // onClose()
        // actions.resetForm()
    }

  return (
    <Modal
        isOpen={isOpen}
        onClose={closeModal}
        isCentered
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Add a friend</ModalHeader>
            <ModalCloseButton />
            <Formik
             initialValues={{name:''}}
             onSubmit={submitFormFriend}
             validationSchema={friendSchema}
            >
            <Form>
            <ModalBody>
                <Heading 
                    as='p' 
                    color='red.500'
                    textAlign='center'
                > 
                    {error}
                </Heading>
                <Textfield 
                    label='friends name'
                    placeholder='Enter friends username'
                    autoComplete='off'
                    name="name" type='text'                
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    colorScheme='blue' 
                    
                    type='submit'
                >
                    Submit
                </Button>
            </ModalFooter>
            </Form>
            </Formik>
        </ModalContent>
    </Modal>
  )
}
