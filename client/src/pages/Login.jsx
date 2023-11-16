import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {LOGIN_USER} from '../utils/mutations';
import Auth from '../utils/auth';

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


const Login = ({isOpen,onClose}) => {
//state to manage form data and errors
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [login, {error}] = useMutation(LOGIN_USER);

  //handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,[name]: value,
    });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    try{
      const {data} = login(
        {
          variables: {...formState},
        });
      Auth.login(data.login.token); 
    }
    catch (e){
      console.error(e);
    }

    //clear form values
    setFormState({
      email: '',
      password: '',
    });

  };
  const handleCancel = () => {
    onClose(); //Close the modal when cancel button is clicked
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/*Overlay when the model is open */}
      <ModalOverlay />
      <ModalContent>
        {/*Header and close button */}
        <ModalHeader textAlign="left" borderBottomWidth="1px">
          <Box fontSize="lg">Login</Box>
          {/*Close button 'x'*/}
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
        {/*Body*/}
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </FormControl>
              {/*Password input*/}
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormControl>
              {/*Submit button*/}
              <Button
                colorScheme="blue"
                variant="solid"
                w="100%"
                type="submit"
              >
                Login
              </Button>
              {/*Cancel button*/}
              <Button
                onClick={handleCancel}
                variant="outline"
                colorScheme="gray"
                w="100%"
                borderRadius="full"
                borderColor="black"
                borderWidth="2px"
              >
                Cancel
              </Button>
              {error && (
                <Box mt={4} p={3} bg="red.500" color="white">
                  {error.message}
                </Box>
              )}
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Login;
