import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {ADD_USER} from '../utils/mutations';
import Auth from '../utils/auth';
import { Modal } from '@chakra-ui/react';

import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';

const Signup = ({isOpen, onClose}) => {
    //state to manage form data and errors
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, {error}] = useMutation(ADD_USER);

    //handle input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({
            ...formState, [name]: value,
        });
    };
    //handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault(); //prevent default browser refresh
        console.log(formState); //log form state
        try{
            const {data} = await addUser(
                {
                    variables: {...formState}, //Pass form state variables to mutation
                });
            Auth.login(data.addUser.token); //log the user in the received token
        }
        catch (e){
            console.error(e); //log any encountered errors during signup
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/*Overlay when the model is open*/}
            <ModalOverlay />
            <ModalContent>
                {/*Header and close button*/}
                <ModalHeader textAlign="left" borderBottomWidth="1px">
                    <Box fontSize="lg">Sign Up</Box>
                    {/* Close button 'x' */}
                    <Button
                        onClick={onClose}
                        variant="unstyled"
                        fontSize="lg"
                        position="absolute"
                        right="1rem"
                        top="0.5rem"
                    >
                        X
                    </Button>
            </ModalHeader>
            </ModalContent>
        </Modal>
    );
};
export default Signup;


