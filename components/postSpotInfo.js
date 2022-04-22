// 投稿内容を表示するコンポーネント

import React, { useState } from "react";
// import ImgData from "../img/aa.png";

import {
  Heading,
  Stack,
  Text,
  Badge,
  useColorModeValue,
  Box,
  HStack,
  Link,
  Divider,
} from "@chakra-ui/react";
import MyImage from "./MyImage";
// import { Link } from "react-router-dom";

// 👆ここまでインポート

const PostSpotInfo = ({
  image,
  spotname,
  spotaddress,
  spottel,
  spotcomment,
  spotcategory,
  dog,
  link,
}) => {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w="350px"
      height="280px"
      //   direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"xl"}
      mt="10px"
      ml="20px"
    >
      <Heading
        // color="#EF9996"
        mt="10px"
        ml="15px"
        fontSize="14px"
        fontWeight="bold"
        textAlign="left"
        as="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {spotname}
      </Heading>
      <Divider />

      <HStack>
        <Box w="80px" ml="15px">
          {image && (
            <div>
              <img src={image} alt="画像あるとき" />
            </div>
          )}
          {/*       {!image && <img src={ImgData} alt="画像ないとき" />} */}
          {!image && (
            <div>
              <MyImage fname="nopic.png" size="60" />
            </div>
          )}
        </Box>

        <Box w="230px">
          <Stack mt="5px" ml="10px" direction="row">
            <Stack>
              <Badge>住所</Badge>
              <Text mt="1px" fontSize="12px">
                {spotaddress}
              </Text>

              <Badge>電話番号</Badge>
              <Text mt="1px" fontSize="12px">
                {spottel}
              </Text>

              <Badge>おすすめポイント</Badge>
              <Text mt="1px" fontSize="12px">
                {spotcomment}
              </Text>

              <Stack direction="row" mt="1px">
                <Badge colorScheme="blue">{spotcategory}</Badge>
                <Badge colorScheme="green">{dog}</Badge>
                {/* <Badge colorScheme="red">店内可</Badge>
                <Badge colorScheme="purple">テラス可</Badge> */}
              </Stack>

              {/* <Link mt="1px" fontSize="12px" href={link}>
                GoogleBusinessPlofileを見る
              </Link> */}
            </Stack>
          </Stack>
        </Box>
      </HStack>
    </Stack>
  );
};

export default PostSpotInfo;
