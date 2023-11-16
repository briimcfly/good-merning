import React from 'react';
import { useState } from 'react';
import { VStack, Box, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

const Landing = () => {
    //This code will be moved to the Navigation Component once we build it 
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const handleOpenLogin = () => setIsLoginOpen(true);
    const handleCloseLogin = () => setIsLoginOpen(false);

  return (
    <Box textAlign="center" fontSize="xl">
      <Text mb={4} mt={8}>This is where the users will land</Text>
      <Text mb={4}>We'll update this page as we go, but for now its going to be a router of sorts...</Text>
      <VStack>
        <Button colorScheme="blue">Go to Listing Page</Button>
        <Button colorScheme="green" onClick={handleOpenLogin}>Open Login Component</Button>
        <Button colorScheme="yellow">Open Signup Component</Button>
        <Button colorScheme="red" as={Link} to="/1325">Open Error Page</Button>
      </VStack>
      <Login isOpen={isLoginOpen} onClose={handleCloseLogin} />
    </Box>
  );
};

export default Landing;
