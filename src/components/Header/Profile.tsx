import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData}: ProfileProps) {  
  return (
    <Flex align="center">
    { showProfileData && (
      <Box mr="4" textAlign="right">

      <Text> Lucas Freire</Text>
      <Text color="gray.300" fontSize="small"> 
        l.casfreirelopes@hotmail.com
      </Text>
    </Box>
    )}

    <Avatar size="md" name="Lucas Freire" src="https://github.com/Freirelf.png" />
  </Flex>
  )
}