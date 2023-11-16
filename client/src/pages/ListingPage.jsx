import React, {useState, useEffect }  from 'react';
import { useQuery } from '@apollo/client';
import {Box, Heading, SimpleGrid} from '@chakra-ui/react';
import { QUERY_LISTINGS } from '../utils/queries';
import Listing from '../components/Listing';
import {useParams} from 'react-router-dom';

const ListingPage = () => {
    const {city, state} = useParams();

    const { loading, error, data } = useQuery(QUERY_LISTINGS, {
        variables: { city, state }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    console.log(data);

    return (
        <Box padding="4">
          <Heading as="h1" mb="8">Listings in {city}, {state}</Heading>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="8">
            {data.listings.map(listing => (
              <Listing key={listing._id} listing={listing} />
            ))}
          </SimpleGrid>
        </Box>
      );
}

export default ListingPage;