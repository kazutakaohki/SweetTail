import Header from "../components/Header";
import Footer from "../components/Footer";
import App from "../components/map";
import SearchIconBox from "../components/SearchIconBox";
// Chakra UI
import { Divider, useColorModeValue, Flex } from "@chakra-ui/react";

// 👆ここまでインポート

const Search = () => {
  return (
    <div>
      <Header />
      {/* <InputGroup w="350px" mt="10px" ml="20px">
        <Input
          type="text"
          placeholder="キーワードでお出かけスポットを検索する"
          textAlign="center"
        />
      </InputGroup> */}
      <Flex
        spacing={"15px"}
        w={"350px"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={1}
        mt="5px"
        ml="20px"
      >
        <SearchIconBox />
      </Flex>
      <Divider mt="15px" />

      <App />

      <Footer />
    </div>
  );
};

export default Search;
