import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
// React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Chakra UI
import {
  HStack,
  Stack,
  useColorModeValue,
  Flex,
  FormControl,
  Input,
  Button,
  Text,
  Link,
  Divider,
  Box,
} from "@chakra-ui/react";
// Firebase
import { storage, db } from "../firebase/firebase_init";
//Firebase ver9 compliant
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase_init";

// 👆ここまでインポート

const Register = () => {
  // useStateを準備　画像を保持する、入力された文字を保持する
  const [user, setUser] = useState("");
  const [usernameValue, setUserNameValue] = useState();
  // const [emailvalue, setEmailValue] = useState();
  const [dognameValue, setDognameValue] = useState();
  const [dogkindsValue, setDogkindsValue] = useState();
  const [dogageValue, setDogageValue] = useState();
  const [doggenderValue, setDoggenderValue] = useState();
  const [dogweightValue, setDogweightValue] = useState();
  const [image, setImage] = useState(null);

  const router = useRouter();

  const onChangeImageHandler = (e) => {
    console.log(e.target.files[0], "画像");
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  // 送信
  //後で中身を記述
  const sendClick = (e) => {
    // 1.
    e.preventDefault();
    if (image) {
      //後で記述

      // 画像 + テキストの処理
      // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元のファイルが削除される
      // そのためにファイル名をランダムに作成する必要があるので「jsのテクニック」でランダムな文字列を作成
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補62文字
      const N = 16;

      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が16個選ばれる
        .map((n) => S[n % S.length])
        .join("");

      const fileName = randomChar + "_" + image.name;

      //Firebase ver9 compliant (firebase strageに登録している箇所↓)
      const uploadImage = uploadBytesResumable(
        ref(storage, `images/${fileName}`),
        image
      );

      // 画像とテキストをfirestoreの方に送る記述
      //Firebase ver9 compliant
      uploadImage.on(
        "state_changed",
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          //Firebase ver9 compliant
          //ファイル名 12345 +  morita = 12345morita
          //ref(storage, `images/${fileName}`) ＝
          await getDownloadURL(ref(storage, `images/${fileName}`)).then(
            async (url) => {
              addDoc(collection(db, "users"), {
                username: usernameValue,
                email: user.email,
                image: url,
                dogname: dognameValue,
                dogkinds: dogkindsValue,
                dogage: dogageValue,
                doggender: doggenderValue,
                dogweight: dogweightValue,
                timestamp: serverTimestamp(),
              });
            }
          );
        }
      );
    } else {
      //Firebase ver9 compliant
      addDoc(collection(db, "users"), {
        username: usernameValue,
        email: user.email,
        image: "",
        dogname: dognameValue,
        dogkinds: dogkindsValue,
        dogage: dogageValue,
        doggender: doggenderValue,
        dogweight: dogweightValue,
        timestamp: serverTimestamp(),
      });
    }
    // useStateを空にする=入力欄を空白にする処理
    setImage(null);
    setUserNameValue("");
    setDognameValue("");
    setDogkindsValue("");
    setDogageValue("");
    setDoggenderValue("");
    setDogweightValue("");
  };

  // ↓ログイン判定
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "currentUser");
      setUser(currentUser);
      // router.push("/");
    });
  }, []);

  // ここまで追加

  return (
    <div>
      <Header />

      <Box
        borderWidth="1px"
        borderRadius="lg"
        w="350px"
        height="120px"
        //   direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("#FFEDED", "gray.50")}
        boxShadow={"xl"}
        mt="20px"
        ml="20px"
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
            ユーザー登録がお済みの方はこちら
          </Text>
          <Link href="/" color="red" fontWeight="bold">
            Home
          </Link>
          <Link href="/mypage" color="red" fontWeight="bold">
            マイページ
          </Link>
        </Stack>
      </Box>

      <Divider mt="20px" />

      <Text
        w="390px"
        mt="10px"
        color="red"
        fontSize="16px"
        fontWeight="bold"
        lineHeight="30px"
        textAlign="center"
        alignItems="center"
      >
        ユーザー登録がまだの方は以下からご登録下さい
      </Text>

      <TitleBar title="　ユーザー情報（必須）" />

      <form onSubmit={sendClick}>
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
                placeholder="ユーザーネーム"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={usernameValue}
                onChange={(e) => setUserNameValue(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <Input
                placeholder="メールアドレス"
                _placeholder={{ color: "gray.500" }}
                type="email"
                value={user.email}
                readOnly
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </FormControl>
          </Stack>
        </Flex>

        <TitleBar title="　愛犬情報（任意）" />

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
            {/* 画像を登録する→storage */}
            <input type="file" onChange={onChangeImageHandler}></input>
            <Stack>
              <FormControl>
                <Input
                  placeholder="愛犬の名前"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={dognameValue}
                  onChange={(e) => setDognameValue(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <Input
                  placeholder="犬種"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={dogkindsValue}
                  onChange={(e) => setDogkindsValue(e.target.value)}
                />
              </FormControl>

              <HStack>
                <FormControl>
                  <Input
                    w="110px"
                    placeholder="年齢"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={dogageValue}
                    onChange={(e) => setDogageValue(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    w="110px"
                    placeholder="性別"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={doggenderValue}
                    onChange={(e) => setDoggenderValue(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    w="110px"
                    placeholder="体重"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={dogweightValue}
                    onChange={(e) => setDogweightValue(e.target.value)}
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
                type="submit"
                disabled={!usernameValue}
                onClick={() => router.push("/thanks")}
              >
                登録
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>

      <Footer />
    </div>
  );
};

export default Register;
