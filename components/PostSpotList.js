// 投稿内容を表示するコンポーネント

import React, { useState } from "react";
// import ImgData from "../img/aa.png";
import { db } from "../firebase/firebase_init";
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Heading,
  Stack,
  Text,
  Badge,
  useColorModeValue,
  Box,
  HStack,
  Divider,
} from "@chakra-ui/react";
import MyImage from "./MyImage";

const PostSpot = ({
  image,
  spotname,
  spotaddress,
  spottel,
  spotcategory,
  spotdetail,
  spotcomment,
}) => {
  // text, image, timestamp はfirebaseからデータを頂戴！と言って取得した
  // ものをこのPotst.jsにデータを渡して→表示する　という仕組み🤗

  // 更新用のuseStateを追加
  // Feed.jsからtextという目印にfirebaseのデータである「text: xxxx;」が渡ってきています😁
  // それを設定することで,初期値が登録されたtextのデータになります😁
  // const [title, setTitle] = useState(spotname);

  // ポイント！(db,'posts')ここがコレクション（箱）にアクセスしている記述になります！間違えないように！
  // const spotnameRef = collection(db, "spots");

  // // 編集の処理
  // const editTask = async () => {
  //   await setDoc(
  //     // アクセスはどこにアクセスするの？＝ doc ドキュメント
  //     doc(spotnameRef, id), //collection(db, 'posts') + id //23rfrwxzdfwefxefe(idのイメージ)　特定できる
  //     {
  //       spotname: title,
  //       timestamp: serverTimestamp(),
  //     },
  //     { merge: true }
  //   );
  // };

  // // 削除の処理
  // const deleteTask = async () => {
  //   await deleteDoc(doc(spotnameRef, id));
  // };

  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w="350px"
      height="280px"
      //   direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"xl"}
      mt="10px"
      ml="20px"
    >
      <Heading
        mt="10px"
        ml="15px"
        fontSize="14px"
        fontWeight="bold"
        textAlign="left"
        //  as="a"
        //  href={link}
        //  target="_blank"
        //  rel="noopener noreferrer"
      >
        {spotname}
      </Heading>
      <Divider />

      <HStack>
        <Box w="80px" ml="15px">
          {image && (
            <div>
              <img src={image} alt="画像あるとき" />
            </div>
          )}
          {/*       {!image && <img src={ImgData} alt="画像ないとき" />} */}
          {!image && (
            <div>
              <MyImage fname="nopic.png" size="60" />
            </div>
          )}
        </Box>

        <Box w="230px">
          <Stack mt="5px" ml="10px" direction="row">
            <Stack>
              <Badge>住所</Badge>
              <Text mt="1px" fontSize="12px">
                {spotaddress}
              </Text>

              <Badge>電話番号</Badge>
              <Text mt="1px" fontSize="12px">
                {spottel}
              </Text>

              <Badge>おすすめポイント</Badge>
              <Text mt="1px" fontSize="12px">
                {spotcomment}
              </Text>

              <Stack direction="row" mt="1px">
                <Badge colorScheme="blue">{spotcategory}</Badge>
                <Badge colorScheme="green">{spotdetail}</Badge>
                {/* <Badge colorScheme="red">店内可</Badge>
                <Badge colorScheme="purple">テラス可</Badge> */}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </HStack>
    </Stack>
  );
};

export default PostSpot;
