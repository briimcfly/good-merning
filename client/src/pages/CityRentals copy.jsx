import React, {useState, useEffect }  from 'react';
import { useQuery } from '@apollo/client';
import {Stack, Button, Box, Heading, SimpleGrid} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
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

const CityRentals = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {city, state} = useParams();

    const { loading, error, data } = useQuery(QUERY_RENTALS, {
@@ -27,27 +32,40 @@ const CityRentals = () => {
    const rentals = data.rentals;

    return (
    <>
        <Box padding="4">
            <Stack direction='row' spacing={4}>
                <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" as={Link} to="/" mt={1}>
                    Go Back
                </Button>
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
			<>
				<Box padding="4">
					<Stack direction="row" spacing={4} justify={'space-between'}>
						<Button
							leftIcon={<ArrowBackIcon />}
							colorScheme="teal"
							as={Link}
							to="/"
							mt={1}
						>
							Go Back
						</Button>
						<Heading as="h1" mb="8">
							Listings in {city}, {state}
						</Heading>
						<Box alignItems="left">
							<Button
								leftIcon={<PlusSquareIcon />}
								colorScheme="teal"
								onClick={onOpen}
							>
								Add a New Listing
							</Button>
						</Box>
					</Stack>
					<SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing="8">
						{rentals.map((rental) => (
							<RentalCard key={rental.address} rental={rental} />
						))}
					</SimpleGrid>
				</Box>
				<NewLocationReview isOpen={isOpen} onClose={onClose} />
			</>
		);
}

export default CityRentals;