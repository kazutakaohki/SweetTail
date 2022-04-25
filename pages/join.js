import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import PageTitle from "../components/PageTitle";
import MyImage from "../components/MyImage";
import MobileApp from "../components/MobileApp";
import { SignInForm } from "../components/SignInForm";
// React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdCheckCircle } from "react-icons/md";
// Chakra UI
import {
  Link,
  Text,
  List,
  ListItem,
  ListIcon,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
// Firebase
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase_init";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// 👆ここまでインポート

const Join = () => {
  const [user, setUser] = useState("");
  // const [emailvalue, setEmailValue] = useState("");
  // const [passwordvalue, setPasswordValue] = useState("");

  // const [dognameValue, setDognameValue] = useState();
  // const [dogkindsValue, setDogkindsValue] = useState();
  // const [dogageValue, setDogageValue] = useState();
  // const [doggenderValue, setDoggenderValue] = useState();
  // const [dogweightValue, setDogweightValue] = useState();

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password)
        // ↓firestoreにドキュメントを追加する処理

        .then(() => {
          addDoc(collection(db, "users"), {
            email: user.email,

            // image: url,
            // dogname: dognameValue,
            // dogkinds: dogkindsValue,
            // dogage: dogageValue,
            // doggender: doggenderValue,
            // dogweight: dogweightValue,

            timestamp: serverTimestamp(),
          })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch((error) => {
              console.log("Firestore登録エラー: ", error);
            });
        });
      //we need to catch the whole sign up process if it fails too.
      // .catch((error) => {
      //   console.log("Something went wrong with sign up: ", error);
      // });

      // ↑firestoreにドキュメントを追加する処理
    } catch (error) {
      alert("正しく入力してください");
    }

    // setDognameValue("");
    // setDogkindsValue("");
    // setDogageValue("");
    // setDoggenderValue("");
    // setDogweightValue("");
  };

  /* ↓state変数「user」を定義 */

  const router = useRouter();

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <div>
      <Header />

      <>
        {/* ↓ログインしていればマイページを表示 */}
        {user ? (
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
            <Stack w="350px" textAlign="center">
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
                メールアドレスが登録されました
              </Text>

              <Link href="/register" color="red" fontWeight="bold">
                続けてユーザー情報を登録して下さい
              </Link>
              {/* <Link href="/mypage" color="red" fontWeight="bold">
                マイページ
              </Link> */}
            </Stack>
          </Stack>
        ) : (
          <>
            <MyImage fname="newmemtop.png" size="390" />
            <PageTitle title="新規会員登録" />
            <TitleBar title="　会員特典" />

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

            <MobileApp />

            {/* <Text w="370px" mt="10px" align="center" fontSize="12px">
              <Link color="blue.500" href="#">
                そのままwebブラウザで利用を続ける場合はこちら
              </Link>
            </Text> */}

            {/* 新規登録処理 */}

            <TitleBar title="　新規会員登録フォーム" />

            <form onSubmit={handleSubmit}>
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
                    value={user?.email}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<RiLockPasswordFill color="gray.300" />}
                  />
                  <Input
                    as="input"
                    placeholder="パスワードを設定して下さい"
                    name="password"
                    type="password"
                    value={user?.password}
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                </InputGroup>

                <Button
                  as="button"
                  type="submit"
                  size="md"
                  height="48px"
                  width="328px"
                  border="1px"
                  borderColor="gray.50"
                  backgroundColor="#EF9996"
                  color="white"
                  textAlign="center"
                  ml="20px"
                >
                  登録する
                </Button>
              </Stack>
            </form>

            <TitleBar title="　ソーシャルアカウントで登録" />
            <Stack
              spacing={"15px"}
              w={"350px"}
              maxW={"md"}
              // bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={3}
              // mt="5px"
              ml="20px"
            >
              <SignInForm />
            </Stack>
          </>
        )}
      </>

      <Footer />
    </div>
  );
};

export default Join;
