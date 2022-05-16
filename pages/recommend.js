import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/Titlebar";
import PageTitle from "../components/Pagetitle";
import Stars from "../components/Stars";
// React
import React, { useState } from "react";
import { useRouter } from "next/router";

// chakra UI
import {
  Input,
  Stack,
  HStack,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
// Firebase
import { storage, db } from "../firebase/firebase_init";
//Firebase ver9 compliant
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// 👆ここまでインポート

const Recommend = () => {
  // useStateを準備　画像を保持する、入力された文字を保持する
  const [spotnameValue, setSpotnameValue] = useState();
  const [spotaddressValue, setSpotaddressValue] = useState();
  const [spottelValue, setSpottelValue] = useState();
  const [spottimeValue, setSpottimeValue] = useState();
  const [spotcategoryValue, setSpotcategoryValue] = useState();
  const [spotinoutValue, setSpotinoutValue] = useState();
  const [dogValue, setDogValue] = useState();
  // const [spotstarvalue, setSpotStarValue] = useState();
  const [spotparkingValue, setSpotparkingValue] = useState();
  const [spotcommentValue, setSpotcommentValue] = useState();
  const [image, setImage] = useState(null);

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
              addDoc(collection(db, "spots"), {
                image: url,
                spotname: spotnameValue,
                spotaddress: spotaddressValue,
                spottel: spottelValue,
                spottime: spottimeValue,
                spotcategory: spotcategoryValue,
                spotinout: spotinoutValue,
                dog: dogValue,
                // spotstar: spotstarValue,
                spotparking: spotparkingValue,
                spotcomment: spotcommentValue,
                timestamp: serverTimestamp(),
              });
            }
          );
        }
      );
    } else {
      //Firebase ver9 compliant
      addDoc(collection(db, "spots"), {
        image: "",
        spotname: spotnameValue,
        spotaddress: spotaddressValue,
        spottel: spottelValue,
        spottime: spottimeValue,
        spotcategory: spotcategoryValue,
        spotinout: spotinoutValue,
        dog: dogValue,
        // spotstar: spotstarValue,
        spotparking: spotparkingValue,
        spotcomment: spotcommentValue,
        timestamp: serverTimestamp(),
      });
    }
    // useStateを空にする=入力欄を空白にする処理
    setImage(null);
    setSpotnameValue("");
    setSpotaddressValue("");
    setSpottelValue("");
    setSpottimeValue("");
    setSpotcategoryValue("");
    setSpotinoutValue("");
    setDogValue("");
    setSpotparkingValue("");
    // setSpotstarValue("");
    setSpotcommentValue("");
  };

  const router = useRouter(); //useRouterフックを定義

  return (
    <div>
      <Header />
      <PageTitle title="オススメのお出かけスポットを登録する" />
      <TitleBar title="　1.写真を登録する" />

      <form onSubmit={sendClick}>
        {/* 画像を登録する→storage */}
        <Input
          w="350px"
          ml="10px"
          mt="20px"
          border="none"
          type="file"
          onChange={onChangeImageHandler}
        ></Input>
        <Box>
          <img></img>
        </Box>

        <TitleBar title="　2.住所・連絡先を登録する" />

        {/* スポットの住所等の情報を登録する→database */}

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
          onSubmit={sendClick}
        >
          <Input
            type="text"
            placeholder="名　　称"
            value={spotnameValue}
            onChange={(e) => setSpotnameValue(e.target.value)}
          />

          <Input
            type="text"
            placeholder="住　　所"
            value={spotaddressValue}
            onChange={(e) => setSpotaddressValue(e.target.value)}
          />

          <Input
            type="tel"
            placeholder="電話番号"
            value={spottelValue}
            onChange={(e) => setSpottelValue(e.target.value)}
          />

          <Input
            type="text"
            placeholder="営業時間"
            value={spottimeValue}
            onChange={(e) => setSpottimeValue(e.target.value)}
          />

          <Select
            color="gray.400"
            placeholder="カテゴリーを選択"
            value={spotcategoryValue}
            onChange={(e) => setSpotcategoryValue(e.target.value)}
          >
            <option value="カフェ">カフェ</option>
            <option value="ショップ">ショップ</option>
            <option value="レジャー">レジャー</option>
            <option value="その他">その他</option>
          </Select>

          <Select
            color="gray.400"
            placeholder="店内／テラス（屋内／屋外）"
            value={spotinoutValue}
            onChange={(e) => setSpotinoutValue(e.target.value)}
          >
            <option value="店内○／テラス○">店内○／テラス○</option>
            <option value="店内×／テラス○">店内×／テラス○</option>
            <option value="店内○／テラス×">店内○／テラス×</option>
            <option value="屋外">屋外</option>
            <option value="屋内">屋内</option>
            <option value="その他">その他</option>
          </Select>

          <Select
            color="gray.400"
            placeholder="駐車場有無"
            value={spotparkingValue}
            onChange={(e) => setSpotparkingValue(e.target.value)}
          >
            <option value="Ｐ無し">Ｐ無し</option>
            <option value="Ｐ有り">Ｐ有り</option>
          </Select>

          <Select
            color="gray.400"
            placeholder="一緒に行ける犬のサイズ"
            value={dogValue}
            onChange={(e) => setDogValue(e.target.value)}
          >
            <option value="小型犬">小型犬</option>
            <option value="中型犬">中型犬</option>
            <option value="大型犬">大型犬</option>
          </Select>
        </Stack>

        <TitleBar title="　3.おすすめ情報を登録する" />

        {/* レーティング */}
        {/* <HStack mt="10px">
          <Text ml="26px" mr="20px" fontWeight="bold" color="gray.400">
            おすすめ度
          </Text>

          <Stars
            value={spotstarValue}
            onChange={(e) => setSpotstarValue(e.target.value)}
          />
        </HStack> */}
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
          <Textarea
            w="325px"
            mt="10px"
            placeholder="おすすめコメント"
            value={spotcommentValue}
            onChange={(e) => setSpotcommentValue(e.target.value)}
          />
          <Text fontSize="10px" textAlign="center" mt="5px" w="325px">
            ご登録頂いたスポット情報は事務局で確認後に反映されます
          </Text>

          <HStack
            w="325px"
            mt="10px"
            spacing={4}
            align="center"
            justifyContent="center"
          >
            <Button
              colorScheme="gray"
              color="gray"
              fontSize="12px"
              variant="outline"
            >
              キャンセル
            </Button>
            <Button
              bg="#EF9996"
              color="white"
              fontSize="12px"
              variant="solid"
              // type="submit"
              disabled={!spotnameValue}
              onClick={() => router.push("/thanks")}
            >
              登録する
            </Button>
          </HStack>
        </Stack>
      </form>

      <Footer />
    </div>
  );
};

export default Recommend;
