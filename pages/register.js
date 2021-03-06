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

// ðããã¾ã§ã¤ã³ãã¼ã

const Register = () => {
  // useStateãæºåãç»åãä¿æãããå¥åãããæå­ãä¿æãã
  const [user, setUser] = useState("");
  const [usernameValue, setUserNameValue] = useState();
  const [emailvalue, setEmailValue] = useState();
  const [dognameValue, setDognameValue] = useState();
  const [dogkindsValue, setDogkindsValue] = useState();
  const [dogageValue, setDogageValue] = useState();
  const [doggenderValue, setDoggenderValue] = useState();
  const [dogweightValue, setDogweightValue] = useState();
  const [image, setImage] = useState(null);

  const router = useRouter();

  const onChangeImageHandler = (e) => {
    console.log(e.target.files[0], "ç»å");
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  // éä¿¡
  //å¾ã§ä¸­èº«ãè¨è¿°
  const sendClick = (e) => {
    // 1.
    e.preventDefault();
    if (image) {
      //å¾ã§è¨è¿°

      // ç»å + ãã­ã¹ãã®å¦ç
      // firebaseã®ä»æ§ã§åããã¡ã¤ã«åã®ç»åãè¤æ°åã¢ãããã¦ãã¾ãã¨åã®ãã¡ã¤ã«ãåé¤ããã
      // ãã®ããã«ãã¡ã¤ã«åãã©ã³ãã ã«ä½æããå¿è¦ãããã®ã§ãjsã®ãã¯ããã¯ãã§ã©ã³ãã ãªæå­åãä½æ
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ã©ã³ãã ãªæå­åãä½ãããã®åè£62æå­
      const N = 16;

      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N))) //ä¹±æ°ãçæãã¦ããããã®ã§0ããã©ã³ãã ãªæ°å­ã16åé¸ã°ãã
        .map((n) => S[n % S.length])
        .join("");

      const fileName = randomChar + "_" + image.name;

      //Firebase ver9 compliant (firebase strageã«ç»é²ãã¦ããç®æâ)
      const uploadImage = uploadBytesResumable(
        ref(storage, `images/${fileName}`),
        image
      );

      // ç»åã¨ãã­ã¹ããfirestoreã®æ¹ã«éãè¨è¿°
      //Firebase ver9 compliant
      uploadImage.on(
        "state_changed",
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          //Firebase ver9 compliant
          //ãã¡ã¤ã«å 12345 +  morita = 12345morita
          //ref(storage, `images/${fileName}`) ï¼
          await getDownloadURL(ref(storage, `images/${fileName}`)).then(
            async (url) => {
              addDoc(collection(db, "users"), {
                username: usernameValue,
                email: emailvalue,
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
        email: emailvalue,
        image: "",
        dogname: dognameValue,
        dogkinds: dogkindsValue,
        dogage: dogageValue,
        doggender: doggenderValue,
        dogweight: dogweightValue,
        timestamp: serverTimestamp(),
      });
    }
    // useStateãç©ºã«ãã=å¥åæ¬ãç©ºç½ã«ããå¦ç
    setImage(null);
    setUserNameValue("");
    setDognameValue("");
    setDogkindsValue("");
    setDogageValue("");
    setDoggenderValue("");
    setDogweightValue("");
  };

  // âã­ã°ã¤ã³å¤å®
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "currentUser");
      setUser(currentUser);
      // router.push("/");
    });
  }, []);

  // ããã¾ã§è¿½å 

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
            ã¦ã¼ã¶ã¼ç»é²ããæ¸ã¿ã®æ¹ã¯ãã¡ã
          </Text>
          <Link href="/" color="red" fontWeight="bold">
            Home
          </Link>
          <Link href="/mypage" color="red" fontWeight="bold">
            ãã¤ãã¼ã¸
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
        ã¦ã¼ã¶ã¼ç»é²ãã¾ã ã®æ¹ã¯ä»¥ä¸ãããç»é²ä¸ãã
      </Text>

      <TitleBar title="ãã¦ã¼ã¶ã¼æå ±ï¼å¿é ï¼" />

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
                placeholder="ã¦ã¼ã¶ã¼ãã¼ã "
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={usernameValue}
                onChange={(e) => setUserNameValue(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <Input
                placeholder="ã¡ã¼ã«ã¢ãã¬ã¹"
                _placeholder={{ color: "gray.500" }}
                type="email"
                value={emailvalue}
                // readOnly
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </FormControl>
          </Stack>
        </Flex>

        <TitleBar title="ãæç¬æå ±ï¼ä»»æï¼" />

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
            {/* ç»åãç»é²ããâstorage */}
            <input type="file" onChange={onChangeImageHandler}></input>
            <Stack>
              <FormControl>
                <Input
                  placeholder="æç¬ã®åå"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={dognameValue}
                  onChange={(e) => setDognameValue(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <Input
                  placeholder="ç¬ç¨®"
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
                    placeholder="å¹´é½¢"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={dogageValue}
                    onChange={(e) => setDogageValue(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    w="110px"
                    placeholder="æ§å¥"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={doggenderValue}
                    onChange={(e) => setDoggenderValue(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    w="110px"
                    placeholder="ä½é"
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
                ç»é²
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
