import React, {useState} from 'react';
import {Box, Image, IconButton, HStack, Center, Text} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';

const ImageCarousel = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goLeft = () => {
        setCurrentIndex(currentIndex === 0? images.length - 1 : currentIndex - 1);
    }

    const goRight = () => {
        setCurrentIndex(currentIndex === images.length -1 ? 0 : currentIndex + 1);
    }

    //Empty State goes here ;) 
    const emptyState = "/images/empty-state.png";

    if (images.length === 0) {
        return (
            <Box display='flex' alignItems='center' justifyContent='center'  width ='full' maxH='275px' overflow='hidden'>
                <Image 
                src={emptyState} 
                alt ="No Image Available"
                width='full'
                height='full'
                objectFit='cover' />
            </Box>
        )
    }

    return (
        <Box display='flex' alignItems='center' justifyContent='center'  width ='full' maxH='275px' position='relative' overflow='hidden' >
            <Image 
            src = {images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            width='full'
            height='full'
            objectFit='cover'
            />
            {images.length > 1 && (
                <HStack justify = 'space-between' position='absolute' top='50%' width ='full' px={1}>
                    <IconButton
                    aria-label="Previous Slide"
                    icon={<ChevronLeftIcon />}
                    onClick = {goLeft}
                    isRound
                    size ='lg'
                    bgColor='whiteAlpha.600'
                    />
                    <IconButton
                    aria-label='Next Slide'
                    icon={<ChevronRightIcon />}
                    onClick = {goRight}
                    isRound
                    size = 'lg'
                    bgColor='whiteAlpha.600'
                    />
                </HStack>
            )}
        </Box>
    )


}

export default ImageCarousel;