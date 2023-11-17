//This Page will be all the addresses in a city that have one or many reviews. 
//Reviews will be compiled into one listing with an average rating. 

import React, {useState, useEffect }  from 'react';
import { useQuery } from '@apollo/client';
import {Stack, Button, Box, Heading, SimpleGrid} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { QUERY_LISTINGS } from '../utils/queries';
import Review from '../components/Review';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

const CityAddressList = () => {
    const {city, state} = useParams();

    const { loading, error, data } = useQuery(QUERY_LISTINGS, {
        variables: { city, state }
    });

    if (loading) return <p>Loading...</p>;

    if (error) {
      console.error(error);
      return <p>Error...</p>;
    }

    const reviewsByAddress = data.listings.reduce((acc, review) => {
      acc[review.address] = acc[review.address] || [];
      acc[review.address].push(review);
      return acc;
    }, {});

    return (
        <Box padding="4">
            <Stack direction='row' spacing={4}>
                <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" as={Link} to="/" mt={1}>
                    Go Back
                </Button>
                <Heading as="h1" mb="8">
                    Listings in {city}, {state}
                </Heading>  
            </Stack>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="8">
            {Object.entries(listingsByAddress).map(([address, listings]) => {
              // Calculate the average rating and ensure the calculation is correct.
              const averageRating = listings.reduce((sum, listing) => sum + listing.rating, 0) / listings.length;

              // Pass the correct number of reviews and average rating to the Listing component.
              return (
                <Listing key={address} listings={listings} averageRating={averageRating} />
              );
            })}
          </SimpleGrid>
        </Box>
      );
}

export default ListingPage;