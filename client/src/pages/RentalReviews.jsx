// Rental Reviews 
import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { Box, SimpleGrid, Heading, Text, Stack, Divider, Grid, GridItem, Container} from '@chakra-ui/react';
import Loader from '../components/Loader';
import LabeledStarRating from '../components/molecules/LabeledStarRating';
import Legend from '../components/atoms/Legend';
import StarRating from '../components/Stars';


const categoryDisplayNames = {
  landLordScore: "Landlord Score",
  areaScore: "Area Score",
  financialAspects: "Financial Aspects",
  propertyScore: "Property Score",
};


const calcAverages = (reviews) => {
  const scoreSums = {
    landLordScore: {
      attitude: { sum: 0, count: 0 },
      leaseManagement: { sum: 0, count: 0 },
      maintenance: { sum: 0, count: 0 },
      responsiveness: { sum: 0, count: 0 },
    },
    areaScore: {
      location: { sum: 0, count: 0 },
      neighborhood: { sum: 0, count: 0 },
      noiseLevel: { sum: 0, count: 0 },
    },
    financialAspects: {
      rentFairness: { sum: 0, count: 0 },
      rentIncreases: { sum: 0, count: 0 },
      value: { sum: 0, count: 0 },
    },
    propertyScore: {
      amenities: { sum: 0, count: 0 },
      condition: { sum: 0, count: 0 },
      safety: { sum: 0, count: 0 },
    },
  };

  reviews.forEach(review => {
    Object.keys(scoreSums).forEach(category => {
      Object.keys(scoreSums[category]).forEach(item => {
        scoreSums[category][item].sum += review[category][item];
        scoreSums[category][item].count += 1;
      });
    });
  });

  const averages = {};
  Object.keys(scoreSums).forEach(category => {
    let categorySum = 0;
    let itemCount = 0;
    averages[category] = {};
    Object.keys(scoreSums[category]).forEach(item => {
      const { sum, count } = scoreSums[category][item];
      categorySum += sum;
      itemCount += count;
      averages[category][item] = count > 0 ? Math.round((sum / count) * 2) / 2 : 0;
    });
  
    averages[category].overall = itemCount > 0 ? Math.round((categorySum / itemCount) * 2) / 2 : 0;
  });

  return averages;
};



const SummarySection = ({ averages }) => {
  if (!averages) return null;

  return (
    <Box p={10} boxShadow="md" bg="white">
      <Heading as="h2" size="lg">Score Breakdown:</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={24}>
      {Object.keys(averages).map(categoryKey => {
        const categoryName = categoryDisplayNames[categoryKey];
        return (
          <Box key={categoryKey} my={2}>
            <Stack direction = "row">
            <Text fontWeight="bold" fontSize="lg">{categoryName}</Text>
            <StarRating rating={averages[categoryKey].overall} />
            </Stack>
            <Divider />
            <SimpleGrid columns={2}>
              {Object.keys(averages[categoryKey])
                .filter(key => key !== 'overall')
                .map(item => {
                  const itemName = item.charAt(0).toUpperCase() + item.slice(1);
                  return (
                    <>
                    <Box p={4}>
                    <LabeledStarRating key={item} label={itemName} score={averages[categoryKey][item]} />
                    <Legend category={categoryKey} subcategory={item} score={Math.floor(averages[categoryKey][item])} />
                    </Box>
                    </>
                  );
              })}
            </SimpleGrid>
          </Box>
        );
      })}
      </SimpleGrid>
    </Box>
  );
};



const RentalReviews = () => {
    const { address } = useParams();
    const decodedAddress = decodeURIComponent(address);

    const { loading, error, data } = useQuery(QUERY_REVIEWS, {
        variables: { address: decodedAddress }
    });

    if (loading) return <Loader />;
    if (error) return <p>Error...</p>;

    let image1, image2
    if (data && data.reviews && data.reviews.length > 0) {
      image1 = data.reviews[0].images[0] ?? '/images/empty-state.png';
      image2 = data.reviews[0].images[1] ?? '/images/empty-state.png';
    }
    const averages = data && data.reviews ? calcAverages(data.reviews) : null;

    return (
      <>
      <Box bg="gray.50">
        {/* Header */}
        <Box
          bg="gray.600"
          color="white"
          p={10}
          textAlign="center"
          >
          <Heading mb={4}>{address}</Heading>
          <Text fontSize="xl" mb={8}>
          See what others are saying about this address.
          </Text>
        </Box>

        <Container maxW = 'container.xl'>

        <Grid
          h='600px'
          templateRows ='repeat(2, 1fr)'
          templateColumns='repeat(5,1fr)'
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={3} bgImage={`url(${image1})`} bgSize="cover" />
          <GridItem rowSpan={1} colSpan={2} bgImage={`url(${image2})`} bgSize="cover" />
          <GridItem rowSpan={1} colSpan={2} bg='red' />
        </Grid>

        {/* Summary Section */}
        <SummarySection averages={averages} />

        {/* Individual Reviews Section */}
        <Box padding="4" >
          <Text fontSize="xl" fontWeight='bold' mb={4}>
            Individual Reviews
          </Text>
          
          <SimpleGrid spacing="8">
            {data.reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </SimpleGrid>

        </Box>
        </Container>
        </Box>
      </>
      );
};

export default RentalReviews;