import {SimpleGrid, Box, Text} from '@chakra-ui/react'

const RatingWrapper = ({title, children}) => {
    return(
        <Box>
            <Text fontSize = 'md' mb={4}>{title}: </Text>
            <SimpleGrid columns={2} spacing={2} mt={2}>
                {children}
            </SimpleGrid>
        </Box>
    )
}

export default RatingWrapper;