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
                spacing={6}
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Box
                    p={4}
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    textAlign="center"
                    width={{ base: "90%", md: "70%", lg: "50%" }} // Adjust the width responsively
                    maxW="800px" // Limiting maximum width for larger screens
                >
                    {/* Heading */}
                    <Text fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" mb={6} mt={12}>Dwellex</Text>
                    {/* Description */} 
                    <Text fontSize={{ base: "xl", md: "2xl" }} mb={8}> Explore top rentals, share reviews, and choose wisely for your next home sweet home. Discover, Review, Decide..</Text>
                    {/* City Search */}
                    <Box>
                        <Text mb={4}>Search for a city:</Text>
                        <CitySearch />
                    </Box>
                    
                </Box>
            </VStack>
        </Box>
    );
};

export default Landing;
