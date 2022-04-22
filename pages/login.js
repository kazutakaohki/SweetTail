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

// 👆ここまでインポート

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        (user) => {
          console.log("ログイン成功=", user.uid);
          router.push("/mypage");
        }
      );
      // .catch((error) => {
      //   console.error(error);
      // });
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  /* ↓ログインを判定する設定 */
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

      <PageTitle title="ログイン" />
      <TitleBar title="　ログイン（アカウントをお持ちの方）" />
      <>
        {/* ↓ログインしている場合、マイページにリダイレクトする設定 */}
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
              ログイン済みです
            </Text>
            <Link href="/" color="red">
              Home
            </Link>
            <Link href="/mypage" color="red">
              マイページ
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
                    placeholder="メールアドレスを入力して下さい"
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
                    placeholder="パスワードを入力して下さい"
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
                  ログイン
                </Button>
              </Stack>
            </form>
          </>
        )}
      </>
      <TitleBar title="　ソーシャルアカウントでログイン" />
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
      <TitleBar title="　まだアカウントをお持ちでない方" />

      <List fontSize="14px" w="370px" mt="10px" ml="20px" spacing="5px">
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          掲載店舗の割引サービス
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          新着スポットのお知らせ
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          プレゼント応募
        </ListItem>

        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          行きたいスポットリスト
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          スポット登録、口コミ投稿によるポイント獲得
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="#EF9996" />
          愛犬の情報登録　他
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
        新規会員登録
      </Button>

      <Footer />
    </div>
  );
};

export default Login;
