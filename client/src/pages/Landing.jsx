import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

const Landing = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Text mb={4}>This is where the users will land</Text>
      <Button colorScheme="blue">Go to Listing Page</Button>
    </Box>
  );
};

export default Landing;
