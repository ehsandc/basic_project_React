
import { useParams, useNavigate } from 'react-router-dom';
import { data } from '../utils/data';
import { Box, Container, Heading, Image, Button, Text, Tag, UnorderedList, ListItem, VStack, HStack, Flex } from '@chakra-ui/react';

export const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = data.hits.find((hit) => hit.recipe.label === id);

  if (!recipe) {
    return (
      <Center h="100vh">
        <Heading>Recipe not found!</Heading>
      </Center>
    );
  }

  return (
    <Box bg="#4299E1" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Button onClick={() => navigate(-1)} mb={4} variant="solid" bg="white">
          Back to Overview
        </Button>
        
        <Box bg="white" borderRadius="xl" overflow="hidden" p={8}>
          <VStack spacing={6} align="stretch">
            <Flex direction={{ base: "column", md: "row" }} gap={8}>
              <Image 
                src={recipe.recipe.image} 
                alt={recipe.recipe.label} 
                borderRadius="xl"
                maxW={{ base: "100%", md: "50%" }}
                objectFit="cover"
              />
              <Box flex="1">
                <Text color="gray.500" fontSize="sm" mb={2} textTransform="uppercase">
                  {recipe.recipe.mealType?.[0] || 'MEAL'}
                </Text>
                <Heading as="h1" size="xl" mb={4}>{recipe.recipe.label}</Heading>
                
                <Text fontSize="lg" mb={2}>Total Cooking Time: {recipe.recipe.totalTime === 0 ? 'Unknown' : `${recipe.recipe.totalTime} minutes`}</Text>
                <Text fontSize="lg" mb={4}>Servings: {recipe.recipe.yield}</Text>

                <Box mb={6}>
                  <Heading as="h2" size="md" mb={2}>Ingredients:</Heading>
                  <UnorderedList spacing={2}>
                    {recipe.recipe.ingredientLines.map((ingredient, index) => (
                      <ListItem key={index}>{ingredient}</ListItem>
                    ))}
                  </UnorderedList>
                </Box>
                
                <Box mb={4}>
                  <Text fontWeight="bold" mb={2}>Health labels:</Text>
                  <Flex flexWrap="wrap" gap={2}>
                    {recipe.recipe.healthLabels.map((label) => (
                      <Tag 
                        key={label} 
                        colorScheme="purple"
                        textTransform="uppercase"
                        size="sm"
                      >
                        {label}
                      </Tag>
                    ))}
                  </Flex>
                </Box>

                <Box mb={4}>
                  <Text fontWeight="bold" mb={2}>Diet:</Text>
                  <Flex flexWrap="wrap" gap={2}>
                    {recipe.recipe.dietLabels.map((label) => (
                      <Tag 
                        key={label} 
                        colorScheme="green"
                        textTransform="uppercase"
                        size="sm"
                      >
                        {label}
                      </Tag>
                    ))}
                  </Flex>
                </Box>

                {recipe.recipe.cautions.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>Cautions:</Text>
                    <Flex flexWrap="wrap" gap={2}>
                      {recipe.recipe.cautions.map((caution) => (
                        <Tag
                          key={caution}
                          colorScheme="red"
                          textTransform="uppercase"
                          size="sm"
                        >
                          {caution}
                        </Tag>
                      ))}
                    </Flex>
                  </Box>
                )}
              </Box>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};
