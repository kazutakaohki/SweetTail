import Header from "../components/Header";
import Footer from "../components/Footer";
import MapAll from "../components/MapAll";
import MapCafe from "../components/MapCafe";
import MapShop from "../components/MapShop";
import MapLeisure from "../components/MapLeisure";
import MapOther from "../components/MapOther";
import MapTokyo from "../components/MapTokyo";
import MapKanagawa from "../components/MapKanagawa";
import MapChiba from "../components/MapChiba";
import SearchIconBox from "../components/SearchIconBox";

// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Chakra UI
import {
  Divider,
  useColorModeValue,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from "@chakra-ui/react";

// 👆ここまでインポート

const Search = () => {
  return (
    <Box>
      <Header />

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
      <Box>
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
              <MapAll />
            </TabPanel>

            <TabPanel>
              <MapCafe />
            </TabPanel>

            <TabPanel>
              <MapShop />
            </TabPanel>

            <TabPanel>
              <MapLeisure />
            </TabPanel>

            <TabPanel>
              <MapOther />
            </TabPanel>

            <TabPanel>
              <>
                <MapKanagawa />
              </>
            </TabPanel>

            <TabPanel>
              <MapTokyo />
            </TabPanel>

            <TabPanel>
              <MapChiba />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Footer />
    </Box>
  );
};

export default Search;
