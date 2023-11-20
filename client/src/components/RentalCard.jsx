import React from 'react';
import {Box, Text, Flex, Stack, Button} from '@chakra-ui/react';
import {ViewIcon} from '@chakra-ui/icons'
import { formatDate } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import StarRating from './Stars';
import ImageCarousel from './ImageCarousel';

const RentalCard = ({rental}) => {
    const lastReviewDate = formatDate(rental.reviews[0].postedAt);

    const navigate = useNavigate();

    const handleCardClick = () => {
        const encodedAddress = encodeURIComponent(rental.address);
        navigate(`/rentals/${encodedAddress}`)
    }

    const rentalImages = rental.reviews
    .map(review => review.images)
    .flat()
    .filter(image => image);

    return (
        <Box p={5} shadow="md" borderWidth="1px" >
            <ImageCarousel images={rentalImages || []} />
            <Text fontSize="xl" fontWeight="bold">{rental.address}</Text>
            <Stack direction="row" mt={2} align="center">
            <StarRating rating={rental.averageRating.toFixed(1)} />
            <Text color="grey" fontSize="sm">Last Update: {lastReviewDate}</Text>
            </Stack>
            {/* Images and other listing details can go here */}
            <Flex mt={3} justifyContent="space-between">
            <Button></Button>
            <Button color="blue.500" leftIcon={<ViewIcon/>} onClick = {handleCardClick}>View {rental.reviews.length} Reviews </Button>
            </Flex>
        </Box>
    );
}

export default RentalCard;