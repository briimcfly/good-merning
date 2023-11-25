//This Page will be all the addresses in a city that have one or many reviews. 
//Reviews will be compiled into one listing with an average rating. 

import React from 'react';
import { useQuery } from '@apollo/client';
import {Box, SimpleGrid} from '@chakra-ui/react';
import { QUERY_RENTALS } from '../utils/queries';
import RentalCard from '../components/RentalCard';
import {useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import PageHeader from '../components/molecules/PageHeader';
import EmptyState from '../components/molecules/EmptyState';

const CityRentals = () => {
    const {city, state} = useParams();

    const { loading, error, data } = useQuery(QUERY_RENTALS, {
        variables: { city, state }
    });

    const renderContent = () => {
        if(data.rentals.length > 0) {
            return (
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing="8">
                    {rentals.map(rental => (
                        <RentalCard
                            key={rental.address}
                            rental = {rental}
                        />
                    ))}         
                </SimpleGrid>
            );
        } else {
            return <EmptyState/>
        }
    }

    if (loading) return <Loader />;
    if (error) {
      console.error(error);
      return <p>Error...</p>;
    }

    const rentals = data.rentals;

    return (
        <>
       <Box padding="4">
            <PageHeader city={city} state={state} titlePrefix="Rentals in " />
            {renderContent()}
        </Box> 
        </>
    );
}

export default CityRentals;