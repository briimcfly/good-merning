// Rental Reviews 
import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { Box, SimpleGrid, Heading, Stack, Button } from '@chakra-ui/react';
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
        <Box padding="4">
            <Stack direction='row' spacing={4}>
                <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" as={Link} to="/" mt={1}>
                    Go Back
                </Button>
                <Heading as="h1" mb="8">
                    Reviews for {address}
                </Heading>  
            </Stack>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="8">
            {data.reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </SimpleGrid>
        </Box>
      );
};

export default RentalReviews;