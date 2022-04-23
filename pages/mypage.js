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

  // ログアウト処理
  // const router = useRouter();
  // const logout = async () => {
  //   await signOut(auth);
  //   router.push("/");
  // };

  return (
    <div>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      {/* <p>{user?.email}</p>

      <h1>{user?.displayname}</h1> */}
      {/* <div>
        <img src={user.photoURL} />
      </div> */}
      {/* <hr />
      <button onClick={logout}>ログアウト</button> */}
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

            {/* <TitleBar title="　会員情報" />

            <Flex w="370px" ml="10px" align={"center"} justify={"center"}>
              <Stack
                spacing={2}
                w={"full"}
                maxW={"md"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={3}
                mt="5px"
              >
                <FormControl id="userName" isRequired>
                  <Input
                    placeholder="ニックネーム"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={user.displayName}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <Input
                    placeholder="メールアドレス"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    value={user.email}
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                  >
                    編集・更新
                  </Button>
                </Stack>
              </Stack>
            </Flex> */}

            {/* 愛犬情報登録フォーム */}

            {/* <TitleBar title="　愛犬情報" />

            <Flex
              w="370px"
              ml="10px"
              align={"center"}
              justify={"center"}
              // bg={useColorModeValue("gray.50", "gray.800")}
            >
              <Stack
                spacing={2}
                w={"full"}
                maxW={"md"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={3}
                mt="5px"
              >
                <Stack>
                  <FormControl>
                    <Input
                      placeholder="愛犬の名前"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                    />
                  </FormControl>

                  <FormControl>
                    <Input
                      placeholder="犬種"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                    />
                  </FormControl>

                  <HStack>
                    <FormControl>
                      <Input
                        w="110px"
                        placeholder="年齢"
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        w="110px"
                        placeholder="性別"
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        w="110px"
                        placeholder="体重"
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                  </HStack>
                </Stack>

                <Stack
                  spacing={4}
                  direction={["column", "row"]}
                  justifyContent="center"
                >
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                  >
                    編集・更新
                  </Button>
                </Stack>
              </Stack>
            </Flex> */}

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
