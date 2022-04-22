import {
  Stack,
  Flex,
  Text,
  Box,
  SimpleGrid,
  Icon,
  Link,
} from "@chakra-ui/react";
import { ImCheckboxChecked } from "react-icons/im";
import { SiGooglemaps } from "react-icons/si";
import { GoListUnordered } from "react-icons/go";

const Feature = ({ title, text, icon, bgColor }) => {
  return (
    <Stack w="85px" align="center" shadow="md" p="2" rounded="md" bg={bgColor}>
      <Flex
        w="10"
        h="10"
        align="center"
        justify="center"
        rounded="full"
        bg="white"
        _hover={{ bg: "#EF9996" }}
      >
        {icon}
      </Flex>
      <Text fontWeight="bold" fontSize="8px" color="white">
        {title}
      </Text>
    </Stack>
  );
};

export default function SearchIconBox() {
  return (
    <Box
      w="325px"
      h="102px"
      mt="10px"
      ml="5px"
      p="10px"
      justifyContent="center"
      // boxShadow="l"
      rounded="md"
      // border="1px"
      // borderColor="gray.50"
      // bg={"#EF9996"}
    >
      <SimpleGrid columns="3" spacing="3" ml="10px">
        <Link href="/search">
          <Feature
            icon={
              <Icon as={SiGooglemaps} w="7" h="7" _hover={{ color: "white" }} />
            }
            title="地図で探す"
            bgColor="#EF9996"
          />
        </Link>
        <Link href="/list">
          <Feature
            icon={
              <Icon
                as={GoListUnordered}
                w="7"
                h="7"
                _hover={{ color: "white" }}
              />
            }
            title="リストで探す"
            bgColor="#EF9996"
          />
        </Link>
        <Link href="/list">
          <Feature
            icon={
              <Icon
                as={ImCheckboxChecked}
                w="6"
                h="6"
                _hover={{ color: "white" }}
              />
            }
            title="新着から探す"
            bgColor="#EF9996"
          />
        </Link>
      </SimpleGrid>
    </Box>
  );
}
