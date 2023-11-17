import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Box textAlign="center" fontSize="xl" mt={10}>
      <Text mb={4}>Oops! Something went wrong.</Text>
      <Text mb={8}>The page you're looking for cannot be found.</Text>
      <Button colorScheme="teal" as={Link} to="/">
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
