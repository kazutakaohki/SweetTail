import {
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import MyImage from "./MyImage";

const MobileApp = () => {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w="350px"
      height="160px"
      //   direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"xl"}
      mt="20px"
      ml="20px"
    >
      <Heading
        color="#747171"
        mt="15px"
        fontSize="16px"
        fontWeight="bold"
        textAlign="center"
      >
        犬と暮らす未来を創る DogLife Portal
      </Heading>
      <Heading
        color="#EF9996"
        fontSize="25px"
        fontWeight="bold"
        textAlign="center"
      >
        Sweet Tail
      </Heading>
      <HStack justifyContent="center">
        <MyImage fname="sweettail_icon.png" w="56px" h="56px" />
        <Text></Text>
        <div>
          <Text mt="5px" fontSize="12px">
            公式アプリのダウンロードはこちら
          </Text>

          <HStack>
            <MyImage mt="1px" fname="appstore.png" />
            <MyImage mt="1px" fname="googleplay.png" />
          </HStack>
        </div>
      </HStack>
    </Stack>
  );
};

export default MobileApp;
