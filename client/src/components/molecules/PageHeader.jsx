import React from 'react';
import {Flex, Stack, Button, Heading} from '@chakra-ui/react';
import { FaPlusSquare } from 'react-icons/fa';

const PageHeader = ({city, state, address, titlePrefix}) => {
    const displayText = address ? address: `${city}, ${state}`;
    //Split Header Text into two parts 
    const titleFirstLine = titlePrefix || 'Listings in ';
    const titleSecondLine = displayText

    return (
        <Flex
        direction={{ base: 'column', md: 'row' }} 
        justifyContent="space-between"
        alignItems={{ base: 'start', md: 'center' }} 
        p={2}
        wrap="wrap"
         >
            <Stack mb={{ base: 4, md: 8 }} spacing="3">
                <Heading textColor ='gray.600' as="h3" size={{ base: 'xs', sm: 'sm', md: 'md' }}>
                    {titleFirstLine}
                </Heading>
                <Heading as="h2" size={{ base: 'md', sm: 'xl', md: '2xl' }}>
                    {titleSecondLine}
                </Heading>
            </Stack>
            <Button leftIcon={<FaPlusSquare/>}colorScheme="teal" to="/add-review" mt={{ base: 4, md: 0 }} >
                Add Review
            </Button>
        </Flex>
    )
}

export default PageHeader;