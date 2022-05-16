import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import PageTitle from "../components/PageTitle";
import SearchIconBox from "../components/SearchIconBox";
// React
import React, { useState } from "react";
// chakra UI
import {
  Stack,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import SpotInfo from "../components/SpotInfo";
import SpotInfoCafe from "../components/SpotInfoCafe";
import SpotInfoShop from "../components/SpotInfoShop";
import SpotInfoLeisure from "../components/SpotInfoLeisure";
import SpotInfoOther from "../components/SpotInfoOther";
import SpotInfoKanagawa from "../components/SpotInfoKanagawa";
import SpotInfoTokyo from "../components/SpotInfoTokyo";
import SpotInfoChiba from "../components/SpotInfoChiba";

const List = () => {
  return (
    <div>
      <Header />
      <Stack h="full">
        <Stack
          spacing={"15px"}
          w={"350px"}
          // maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={1}
          mt="5px"
          ml="20px"
        >
          <SearchIconBox />
        </Stack>

        <Tabs
          isLazy
          variant="soft-rounded"
          colorScheme="pink"
          w="390px"
          mt="15px"
          align="center"
        >
          <TabList h="20px" mb="5px">
            <Tab w="70px" fontSize="12px">
              ALL
            </Tab>
            <Tab w="70px" fontSize="12px">
              CAFE
            </Tab>
            <Tab w="70px" fontSize="12px">
              SHOP
            </Tab>
            <Tab w="70px" fontSize="12px">
              LEISURE
            </Tab>
            <Tab w="70px" fontSize="12px">
              OTHER
            </Tab>
          </TabList>
          <Divider />
          <TabList h="20px" mt="5px">
            <Tab w="70px" fontSize="12px">
              神奈川
            </Tab>
            <Tab w="70px" fontSize="12px">
              東京
            </Tab>
            <Tab w="70px" fontSize="12px">
              千葉
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SpotInfo />
            </TabPanel>

            <TabPanel>
              <SpotInfoCafe />
            </TabPanel>

            <TabPanel>
              <SpotInfoShop />
            </TabPanel>

            <TabPanel>
              <SpotInfoLeisure />
            </TabPanel>

            <TabPanel>
              <SpotInfoOther />
            </TabPanel>

            <TabPanel>
              <SpotInfoKanagawa />
            </TabPanel>

            <TabPanel>
              <SpotInfoTokyo />
            </TabPanel>

            <TabPanel>
              <SpotInfoChiba />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
      <Footer />
    </div>
  );
};

export default List;
