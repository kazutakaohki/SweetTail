import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import PageTitle from "../components/PageTitle";
import SpotList from "../components/spotlist";
import UserInfo from "../components/UserInfo";
// React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Chakra UI
import { Link, Text, Box, Stack, useColorModeValue } from "@chakra-ui/react";
// Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase_init";

// đăăăŸă§ă€ăłăăŒă

const Mypage = () => {
  const [user, setUser] = useState("");

  // âă­ă°ă€ăłć€ćź
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "currentUser");
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      <Header />
      <PageTitle title="ăă€ăăŒăž" />

      <>
        {/* âă­ă°ă€ăłăăŠăăć Žćăăă€ăăŒăžă«ăȘăă€ăŹăŻăăăèš­ćź */}
        {!user ? (
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
                ă­ă°ă€ăłăăŠäžăă
              </Text>
              <Link href="/login" color="red" fontWeight="bold">
                ă­ă°ă€ăł
              </Link>
              <Link href="/" color="red" fontWeight="bold">
                Home
              </Link>
            </Stack>
          </Stack>
        ) : (
          <>
            {/* äŒćĄæć ± */}

            <UserInfo />

            {/* èĄăăăăčăăăăȘăčă */}

            <TitleBar title="ăèĄăăăăčăăăăȘăčă" />
            <div>
              <Box>
                <SpotList />
              </Box>
            </div>
          </>
        )}
      </>

      <Footer />
    </div>
  );
};

export default Mypage;
