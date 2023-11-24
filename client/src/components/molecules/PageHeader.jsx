import React from 'react';
import {Flex, Heading, Button} from '@chakra-ui/react';
import { FaPlusSquare } from 'react-icons/fa';

const PageHeader = ({city, state, address, titlePrefix}) => {
    const displayText = address ? address: `${city}, ${state}`;
    const title = titlePrefix ? 
    `${titlePrefix} \n ${displayText}` :
    `Listings in \n ${displayText}`;

    return (
        <Flex justifyContent='space-between' p={2}>
            <Heading as='h1' mb={8}>
                {title} 
            </Heading>
            <Button leftIcon={<FaPlusSquare/>}colorScheme="teal" to="/add-review" mt={1}>
                Add Review
            </Button>
        </Flex>
    )
}

export default PageHeader;