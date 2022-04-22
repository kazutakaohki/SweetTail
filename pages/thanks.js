import Header from "../components/Header";
import Footer from "../components/Footer";

// Chakra UI
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Divider,
  Stack,
  Link,
  Text,
} from "@chakra-ui/react";
import MyImage from "../components/MyImage";

// 👆ここまでインポート

const Thanks = () => {
  return (
    <div>
      <Header />
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w="350px"
        height="500px"
        //   direction={{ base: "column", md: "row" }}
        // bg={useColorModeValue("#FFEDED", "gray.50")}
        boxShadow={"xl"}
        mt="20px"
        ml="20px"
        mb="20px"
        align="center"
      >
        <Stack textAlign="center">
          <Text
            w="350px"
            mt="10px"
            color="#747171"
            fontSize="16px"
            fontWeight="bold"
            lineHeight="30px"
            textAlign="center"
            alignItems="center"
          >
            ご登録ありがとうございました！
          </Text>

          <MyImage fname="thanks.png" size="200" />
          <Divider />
          <Link href="/" color="red" fontWeight="bold">
            Home
          </Link>
          <Link href="/mypage" color="red" fontWeight="bold">
            マイページ
          </Link>
        </Stack>
      </Stack>

      <Footer />
    </div>
  );
};

export default Thanks;
