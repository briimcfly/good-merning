import React from 'react';
import {Box, Text, Flex, Stack, Button, Link} from '@chakra-ui/react';
import {ViewIcon} from '@chakra-ui/icons'
import { formatDate } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import StarRating from './Stars';
import ImageCarousel from './ImageCarousel';
import AuthService from '../utils/auth';

const RentalCard = ({rental}) => {
    
    //Get last review date
    const lastReviewDate = formatDate(rental.reviews[0].postedAt);
    
    const navigate = useNavigate();

    //Navigate to Rental Reviews Page
    const handleCardClick = () => {
        const encodedAddress = encodeURIComponent(rental.address);
        navigate(`/rentals/${encodedAddress}`)
    }

    //Get all images from reviews and filter out null values
    const rentalImages = rental.reviews
    .map(review => review.images)
    .flat()
    .filter(image => image);

    const isLoggedIn = AuthService.loggedIn();
    return (
        <Box p={5} shadow="md" borderWidth="1px" >

            {/* Image Carousel */}
            <ImageCarousel images={rentalImages || []} />

            {/* Address */}
            <Text fontSize="xl" fontWeight="bold">{rental.address}</Text>

            {/* Rating and Last Updated Date */}
            <Stack direction="column" mt={2}>
                <StarRating rating={rental.averageRating.toFixed(1)} />
                <Text color="grey" fontSize="sm">Last Updated: {lastReviewDate}</Text>
            </Stack>

            {/* Button Group */}
            <Flex pt={6} justifyContent="space-between" alignItems='center'>
            {isLoggedIn && (
            <Link color="blue.500" href="#">Add Review</Link>
            )}
                {/* Navigate to Rental Reviews Page */}
                <Button color="blue.500" leftIcon={<ViewIcon/>} onClick = {handleCardClick}>View {rental.reviews.length} Reviews </Button>
            </Flex>

        </Box>
    );
}

export default RentalCard;