// 投稿内容を表示するコンポーネント
import TitleBar from "./TitleBar";
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
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

import MyImage from "./MyImage";

const PostUser = ({
  username,
  email,
  image,
  dogname,
  dogkinds,
  dogage,
  doggender,
  dogweight,
}) => {
  // text, image, timestamp はfirebaseからデータを頂戴！と言って取得した
  // ものをこのPotst.jsにデータを渡して→表示する　という仕組み🤗

  // 更新用のuseStateを追加
  // Feed.jsからtextという目印にfirebaseのデータである「text: xxxx;」が渡ってきています😁
  // それを設定することで,初期値が登録されたtextのデータになります😁
  // const [title, setTitle] = useState(username);

  // ポイント！(db,'posts')ここがコレクション（箱）にアクセスしている記述になります！間違えないように！
  // const usernameRef = collection(db, "users");

  // 編集の処理
  // const editTask = async () => {
  //   await setDoc(
  //     // アクセスはどこにアクセスするの？＝ doc ドキュメント
  //     doc(usernameRef, id), //collection(db, 'posts') + id //23rfrwxzdfwefxefe(idのイメージ)　特定できる
  //     {
  //       username: title,
  //       timestamp: serverTimestamp(),
  //     },
  //     { merge: true }
  //   );
  // };

  // 削除の処理
  // const deleteTask = async () => {
  //   await deleteDoc(doc(usernameRef, id));
  // };

  return (
    <div>
      {/* 記述1. テキスト(text)情報を受け取る */}
      <TitleBar title="　ユーザー情報" />
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w="350px"
        height="90px"
        //   direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        mt="10px"
        ml="20px"
      >
        <HStack mt="10px" pl="10px">
          <Text w="100px">ユーザー名</Text>

          <Editable defaultValue={username} fontWeight="bold">
            <EditablePreview />
            <EditableInput />
          </Editable>
        </HStack>

        <HStack mt="5px" pl="10px">
          <Text w="100px">E-mail</Text>

          <Editable defaultValue={email} fontWeight="bold">
            <EditablePreview />
            <EditableInput />
          </Editable>
        </HStack>
      </Stack>

      {/* 編集、削除のボタンを設置 */}

      {/* <input
        type="text"
        value={title} //useStateを追加
        onChange={(e) => setTitle(e.target.value)}
      /> */}

      {/* <button onClick={editTask}>編集</button>
      <button onClick={deleteTask}>削除</button> */}

      <TitleBar title="　愛犬情報" />

      {/* 記述2. 画像(image)情報を受け取る */}
      <HStack
        borderWidth="1px"
        borderRadius="lg"
        w="350px"
        height="130px"
        //   direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        mt="10px"
        ml="20px"
      >
        <Box w="60px" ml="10px">
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

        <Box pl="10px">
          <Stack>
            <HStack>
              <Text>名前</Text>
              <Heading as="h5" size="sm">
                {dogname}
              </Heading>
            </HStack>
            <HStack>
              <Text>犬種</Text>
              <Heading as="h5" size="sm">
                {dogkinds}
              </Heading>
            </HStack>
          </Stack>

          <Box mt="5px">
            <HStack>
              <HStack>
                <Text>年齢</Text>
                <Heading as="h5" size="sm">
                  {dogage}
                </Heading>
                <Text> 歳　／</Text>
              </HStack>

              <HStack>
                <Text>性別</Text>
                <Heading as="h5" size="sm">
                  {doggender}
                </Heading>
              </HStack>
            </HStack>

            <HStack mt="5px">
              <Text>体重</Text>
              <Heading as="h5" size="sm">
                {dogweight}
              </Heading>
              <Text>kg</Text>
            </HStack>
          </Box>
        </Box>
      </HStack>

      {/* 記述3. 日付(timestamp)情報を受け取る */}
      {/* 注意！firebaseのtimestampはjsの形式に変換する必要があるのでnew Dateを使用している */}
      {/* <div>{new Date(timestamp?.toDate()).toLocaleString()}</div> */}

      {/* 更新、削除用の処理を追加で記述します😁 */}
      {/* <hr /> */}
      {/* 更新用のinput */}
    </div>
  );
};

export default PostUser;
