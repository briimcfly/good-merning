// Rental Reviews 
import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { Box, SimpleGrid, Heading, Stack, Button, Text, Flex } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';    
import Loader from '../components/Loader';

const RentalReviews = () => {
    const { address } = useParams();
    const decodedAddress = decodeURIComponent(address);

    const { loading, error, data } = useQuery(QUERY_REVIEWS, {
        variables: { address: decodedAddress }
    });

    if (loading) return <Loader />;
    if (error) return <p>Error...</p>;

    console.log(data);

    return (
      <>
        <Box
        bg="gray.600"
        color="white"
        p={10}
        textAlign="center"
        >
        <Heading mb={4}>{address}</Heading>
        <Text fontSize="xl" mb={8}>
        See what others are saying about this address.
        </Text>
        </Box>
        <Box padding="4" bg="gray.100">
            <Stack direction='row' spacing={4}>
                <Heading as="h1" mb="8">
                   
                </Heading>  
            </Stack>
            <Text fontSize="xl" fontWeight='bold' mb={4}>
              Individual Reviews
            </Text>
            <SimpleGrid spacing="8">
            {data.reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </SimpleGrid>
        </Box>
        </>
      );
};

export default RentalReviews;