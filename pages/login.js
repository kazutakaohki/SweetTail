import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import PageTitle from "../components/PageTitle";
import { SignInForm } from "../components/SignInForm";
// React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdCheckCircle } from "react-icons/md";
// Chakra UI
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  ListItem,
  List,
  Link,
  Text,
  ListIcon,
} from "@chakra-ui/react";
// Firebase
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase_init";

// ðããã¾ã§ã¤ã³ãã¼ã

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();

  /* âé¢æ°ãhandleSubmitããå®ç¾© */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        (user) => {
          console.log("ã­ã°ã¤ã³æå=", user.uid);
          router.push("/mypage");
        }
      );
      // .catch((error) => {
      //   console.error(error);
      // });
    } catch (error) {
      alert("ã¡ã¼ã«ã¢ãã¬ã¹ã¾ãã¯ãã¹ã¯ã¼ããééã£ã¦ãã¾ã");
    }
  };

  /* âã­ã°ã¤ã³ãå¤å®ããè¨­å® */
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "currentUser");
      setUser(currentUser);
    });
  });

  return (
    <div>
      <Header />

      <PageTitle title="ã­ã°ã¤ã³" />
      <TitleBar title="ãã­ã°ã¤ã³ï¼ã¢ã«ã¦ã³ãããæã¡ã®æ¹ï¼" />
      <>
        {/* âã­ã°ã¤ã³ãã¦ããå ´åããã¤ãã¼ã¸ã«ãªãã¤ã¬ã¯ãããè¨­å® */}
        {user ? (
          <Stack w="390px" textAlign="center">
            <Text
              fontSize="13px"
              fontWeight="bold"
              color="white"
              mt="15px"
              backgroundColor="#EF9996"
              lineHeight="30px"
            >
              ã­ã°ã¤ã³æ¸ã¿ã§ã
            </Text>
            <Link href="/" color="red">
              Home
            </Link>
            <Link href="/mypage" color="red">
              ãã¤ãã¼ã¸
            </Link>
          </Stack>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={"15px"}
                w={"350px"}
                maxW={"md"}
                // bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={3}
                mt="15px"
                ml="20px"
                mb="20px"
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<FaUser color="gray.300" />}
                  />
                  <Input
                    as="input"
                    placeholder="ã¡ã¼ã«ã¢ãã¬ã¹ãå¥åãã¦ä¸ãã"
                    name="email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<RiLockPasswordFill color="gray.300" />}
                  />
                  <Input
                    as="input"
                    placeholder="ãã¹ã¯ã¼ããå¥åãã¦ä¸ãã"
                    name="password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </InputGroup>

                <Button
                  as="button"
                  type="submit"
                  size="md"
                  height="48px"
                  width="325px"
                  border="1px"
                  borderColor="gray.50"
                  backgroundColor="#EF9996"
                  color="white"
                  textAlign="center"
                  ml="20px"
                >
                  ã­ã°ã¤ã³
                </Button>
              </Stack>
            </form>
          </>
        )}
      </>
      <TitleBar title="ãã½ã¼ã·ã£ã«ã¢ã«ã¦ã³ãã§ã­ã°ã¤ã³" />
      <Stack
        spacing={"15px"}
        w={"350px"}
        maxW={"md"}
        // bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={3}
        mt="5px"
        ml="20px"
        mb="20px"
      >
        <SignInForm />
      </Stack>
      <TitleBar title="ãã¾ã ã¢ã«ã¦ã³ãããæã¡ã§ãªãæ¹" />

      <List fontSize="14px" w="370px" mt="10px" ml="20px" spacing="5px">
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          æ²è¼åºèã®å²å¼ãµã¼ãã¹
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          æ°çã¹ãããã®ãç¥ãã
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          ãã¬ã¼ã³ãå¿å
        </ListItem>

        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          è¡ãããã¹ããããªã¹ã
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          ã¹ãããç»é²ãå£ã³ãæç¨¿ã«ãããã¤ã³ãç²å¾
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          æç¬ã®æå ±ç»é²ãä»
        </ListItem>
      </List>

      <Button
        as="a"
        href="./join"
        size="md"
        h="48px"
        w="350px"
        border="1px"
        borderColor="gray.50"
        backgroundColor="#EF9996"
        color="white"
        textAlign="center"
        ml="20px"
        mt="15px"
        mb="10px"
      >
        æ°è¦ä¼å¡ç»é²
      </Button>

      <Footer />
    </div>
  );
};

export default Login;
