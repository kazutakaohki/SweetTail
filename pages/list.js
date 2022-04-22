import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import PageTitle from "../components/PageTitle";
import SearchIconBox from "../components/SearchIconBox";
// React
import React, { useState } from "react";
// chakra UI
import { Stack, useColorModeValue } from "@chakra-ui/react";
import SpotInfo from "../components/SpotInfo";

const List = () => {
  return (
    <div>
      <Header />
      <Stack h="full">
        <Stack
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
        </Stack>
        <PageTitle title="お出かけスポットリスト" />
        <TitleBar title="　エリア：首都圏" />

        <SpotInfo />
      </Stack>
      <Footer />
    </div>
  );
};

export default List;
