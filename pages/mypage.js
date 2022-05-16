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

// 👆ここまでインポート

const Mypage = () => {
  const [user, setUser] = useState("");

  // ↓ログイン判定
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "currentUser");
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      <Header />
      <PageTitle title="マイページ" />

      <>
        {/* ↓ログインしている場合、マイページにリダイレクトする設定 */}
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
                ログインして下さい
              </Text>
              <Link href="/login" color="red" fontWeight="bold">
                ログイン
              </Link>
              <Link href="/" color="red" fontWeight="bold">
                Home
              </Link>
            </Stack>
          </Stack>
        ) : (
          <>
            {/* 会員情報 */}

            <UserInfo />

            {/* 行きたいスポットリスト */}

            <TitleBar title="　行きたいスポットリスト" />
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
