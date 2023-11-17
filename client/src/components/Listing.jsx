import React from 'react';
import {Box, Text, Image, Badge, Stack} from '@chakra-ui/react';
import { formatDate } from '../utils/date';

const Listing = ({listing}) => {
    const formattedDate = formatDate(listing.postedAt)
    return (
        <Box p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">{listing.address}</Text>
            {/* <Text fontSize = "sm">{listing.city}, {listing.state}</Text> */}
            <Stack direction="row" mt={2}>
                <Badge borderRadius="full" px="2" colorScheme="teal">
                {listing.rating} Stars
                </Badge>
            </Stack>
            <Text mt={2}>{listing.review}</Text>
            <Text mt={2}>Posted by: {listing.user.username} on {formattedDate}</Text>
            {/* {listing.images && listing.images.map((image, index) => (
                <Image key={index} src={image} alt={`Listing Image ${index + 1}`} mt={2} />
            ))} */}
        </Box> 
    )
}

export default Listing;