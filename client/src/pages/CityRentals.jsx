//This Page will be all the addresses in a city that have one or many reviews. 
//Reviews will be compiled into one listing with an average rating. 

import React, {useState, useEffect }  from 'react';
import { useQuery } from '@apollo/client';
import {Stack, Button, Box, Heading, SimpleGrid} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { QUERY_RENTALS } from '../utils/queries';
import RentalCard from '../components/RentalCard';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const CityRentals = () => {
    const {city, state} = useParams();

    const { loading, error, data } = useQuery(QUERY_RENTALS, {
        variables: { city, state }
    });

    if (loading) return <Loader />;
    if (error) {
      console.error(error);
      return <p>Error...</p>;
    }

    const rentals = data.rentals;

    return (
    <>
        <Box padding="4">
            <Stack direction='row' spacing={4}>
                <Heading as="h1" mb="8">
                    Listings in {city}, {state}
                </Heading>  
            </Stack>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing="8">
          {rentals.map(rental => (
                    <RentalCard
                        key={rental.address}
                        rental = {rental}
                    />
                ))}         
          </SimpleGrid>
        </Box>
    </>
      );
}

export default CityRentals;