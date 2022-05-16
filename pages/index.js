// https://sweettail-next.web.app

import Link from "next/link";
import MyImage from "../components/MyImage";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { MdCheckCircle } from "react-icons/md";
import {
  Stack,
  Text,
  Button,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Box,
} from "@chakra-ui/react";
import SearchIconBox from "../components/SearchIconBox";

const Home = () => {
  return (
    <div>
      <Header />
      <MyImage fname="topimg.png" size="390" />
      {/* <Stack spacing={3} mt="15px" ml="10px" w="370px">
        <Input placeholder="キーワードでお出かけスポットを検索する" size="md" />
      </Stack> */}

      <Stack
        spacing={"15px"}
        w={"350px"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={3}
        mt="20px"
        ml="20px"
      >
        <Text
          w="325px"
          fontSize="15px"
          fontWeight="bold"
          fontColor="#E747171"
          mt="5px"
          textAlign="center"
        >
          ワンコと一緒にお出かけしよう！
        </Text>
        <SearchIconBox />
      </Stack>

      <Stack
        spacing={"15px"}
        w={"350px"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={3}
        mt="20px"
        ml="20px"
      >
        <Text
          w="325px"
          fontSize="15px"
          fontWeight="bold"
          Color="#E747171"
          mt="15px"
          textAlign="center"
        >
          あなたのオススメをみんなに教えてあげよう！
        </Text>

        <Button
          as="a"
          href="./recommend"
          size="md"
          height="48px"
          width="325px"
          border="1px"
          borderColor="gray.50"
          backgroundColor="#EF9996"
          color="white"
          textAlign="center"
          ml="20px"
          mt="15px"
          mb="10px"
        >
          おすすめのお出かけスポットを登録する
        </Button>
      </Stack>

      {/* <Divider mt="20px" /> */}

      <Text
        w="390px"
        mt="20px"
        background="#EF9996"
        color="white"
        fontSize="13px"
        fontWeight="bold"
        lineHeight="30px"
        textAlign="center"
        alignItems="center"
      >
        NEWS
      </Text>

      <List fontSize="14px" w="350px" mt="10px" ml="20px" spacing="5px">
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          2022年4月23日
          <Text>SweetTail　β版をリリースしました！</Text>
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          2022年1月6日
          <Text>
            {" "}
            愛犬家とワンコのためのポータルサイト「SweetTail」準備中です！
          </Text>
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          2021年12月24日
          <Text> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
        </ListItem>

        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          2021年7月28日
          <Text> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          2021年6月13日
          <Text> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          2021年5月30日
          <Text> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
        </ListItem>
      </List>

      <Footer />
    </div>
  );
};

export default Home;
