import { Modal, 
        ModalContent,
        ModalCloseButton,
        ModalBody, 
        ModalFooter, 
        ModalHeader } from '@chakra-ui/modal'
import { Button, 
        ModalOverlay } from '@chakra-ui/react'

import { AddFriendModalProps } from '../../interfaces/frinedsInterface'
import { Textfield } from './textfield'
import { Formik, Form } from 'formik'
import { friendSchema } from '../../../common-formSchema'

export const AddFriendModal= ({ isOpen, onClose}:AddFriendModalProps) => {

    const submitFormFriend = (values:any, actions:any) => {
        alert(JSON.stringify(values, null, 2))
        onClose()
        actions.resetForm()
    }

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Add a friend</ModalHeader>
            <ModalCloseButton />
            <Formik
             initialValues={{friendName:''}}
             onSubmit={submitFormFriend}
             validationSchema={friendSchema}
            >
            <Form>
            <ModalBody>
                <Textfield 
                    label='friends name'
                    placeholder='Enter friends username'
                    autoComplete='off'
                    name="friendName" type={''}                
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
