import React from 'react';
import { useState } from 'react';
import { VStack, Box, Text, Button, Input, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Login from '../components/Login';
import CitySearch from '../components/CitySearch';


const Landing = () => {
    //This code will be moved to the Navigation Component once we build it 
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const handleOpenLogin = () => setIsLoginOpen(true);
    const handleCloseLogin = () => setIsLoginOpen(false);


    //Background Image 
    const backgroundImage = 'url(/images/city-bg.jpg)'

    return (
        <Box
            height="100vh"
            width="100vw"
            bgImage={backgroundImage}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <VStack
                spacing={4}
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Box
                    p={5}
                    bg="white"
                    borderRadius="md"
                    shadow="md"
                    textAlign="center"
                    fontSize="xl"
                    maxWidth="lg"
                >
                    {/* Heading */}
                    <Text fontSize="3xl" fontWeight="bold" mb={4} mt={8}>Dwellex</Text>
                    {/* Description */} 
                    <Text fontSize="lg" mb={6}>Find and review rentals in your city</Text>
                    {/* Search Bar */}
                    <Box mb={6} width="100%">
                        <Input
                            placeholder="Search for a city or neighborhood..."
                            variant = "filled"
                            size="md"
                            borderRadius="md"
                            mr={2}
                        />
                        <Button colorScheme="blue" size="md">Search</Button>

                    </Box>
                </Box>
            </VStack>
        </Box>
    );
};

export default Landing;
