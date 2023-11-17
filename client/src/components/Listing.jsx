import React from 'react';
import {Box, Text, Image, Badge, Stack} from '@chakra-ui/react';
import { formatDate } from '../utils/date';

const Listing = ({listings, averageRating}) => {
    const formattedDate = formatDate(listings[0].postedAt);

    return (
        <Box p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">{listings[0].address}</Text>
            <Stack direction="row" mt={2}>
                <Badge borderRadius="full" px="2" colorScheme="teal">
                    {averageRating.toFixed(1)} Stars
                </Badge>
                <Text mt={2}>{listings.length} Reviews</Text>
            </Stack>
            {/* Images and other listing details can go here */}
        </Box>
    );
}

export default Listing;