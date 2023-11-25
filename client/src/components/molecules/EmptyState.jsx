import React from 'react';
import {Flex, Image, Text} from '@chakra-ui/react';

const EmptyState = () => {
    return (
        <Flex flexDirection='column' alignItems='center' gap={8} p={8}>
            <Image src = "/images/noLocation.png" maxW='550px'/>
            <Text fontWeight='bold' fontSize='lg' textColor='gray.600'>No Reviews for this Area</Text>
        </Flex>
    )
}

export default EmptyState;