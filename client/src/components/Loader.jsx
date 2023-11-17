import { Center, Spinner, Text } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Center h="100vh">
      <Spinner size="xl" color="blue.500" />
      <Text fontSize="xl" ml={3}>
        Loading...
      </Text>
    </Center>
  );
};

export default Loader;
