//This Page will be all the addresses in a city that have one or many reviews. 
//Reviews will be compiled into one listing with an average rating. 

import React, {useState, useEffect }  from 'react';
import { useQuery } from '@apollo/client';
import {Stack, Button, Box, Heading, SimpleGrid} from '@chakra-ui/react';
import { ArrowBackIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { QUERY_RENTALS } from '../utils/queries';
import RentalCard from '../components/RentalCard';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import onOpen from "../components/NewLocationReview";
import NewLocationReview from "../components/NewLocationReview";
import { Flex } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Auth from '../utils/auth';
import { FaPlusSquare } from 'react-icons/fa';
import PageHeader from '../components/molecules/PageHeader';

const CityRentals = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
					<PageHeader city={city} state={state} titlePrefix="Rentals in " />
					<Flex justifyContent="space-between" p={2}>
						<Heading as="h1" mb="8">
							Listings in {city}, {state}
						</Heading>

						<Button
							leftIcon={<FaPlusSquare />}
							colorScheme="teal"
							as={Link}
							to="/"
							mt={1}
						>
							Add Review
						</Button>
					</Flex>
					<SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing="8">
						{rentals.map((rental) => (
							<RentalCard key={rental.address} rental={rental} />
						))}
					</SimpleGrid>
				</Box>
			</>
		);
}

export default CityRentals;