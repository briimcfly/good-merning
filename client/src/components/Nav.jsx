import React from 'react';
import { useState } from 'react';
import { ArrowRightIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {  Flex, Button, Heading, Spacer, HStack, Box } from "@chakra-ui/react"

import Login from './Login';

const Nav = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  //Test this line
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);

  const handleLogin = () => {
    // Implement your login logic here
    // If login is successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // If logout is successful, set isLoggedIn to false
    setIsLoggedIn(false);
  };

  return (

    //if Not Logged In
    <Flex as="nav" width="100vw" height="64px" top="20px" left="20px" justify="space-between" pt={10} pb={10} pl={6} pr={6} alignItems="center" >
      <Box gap="32px">
      <Heading as="h1" font='inter' bg="white" fontWeight="700" size="xl" lineHeight="28px" >Dwellex</Heading>
      </Box>
      <Spacer />
      <HStack>
        {isLoggedIn ? (
          <>
          <Button onClick={HandleLogOut} colorScheme="blue"
                  variant="solid"
                  type="submit"
                  padding="0px, 12px, 0px, 12px"
                  gap="8px">Logout</Button>
          </>
        ) : (
          <>
          <Button border="1px" leftIcon={ < ArrowRightIcon /> } variant="outline" color="blue.500" onClick={handleOpenLogin}>Login</Button>
           <Button leftIcon={ <ArrowUpIcon/> } colorScheme="blue"
                  variant="solid"
                  type="submit"
                  padding="0px, 12px, 0px, 12px"
                  gap="8px"
           >Sign Up</Button>
         </>
       )}
     </HStack>
     <Login isOpen={isLoginOpen} onClose={handleCloseLogin} onLogin={handleLogin} />
   </Flex>
 );
};

export default Nav;