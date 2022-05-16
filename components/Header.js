import MyImage from "./MyImage";
// React
import { AiOutlineMenu } from "react-icons/ai";
// React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Chakra UI
import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Link,
} from "@chakra-ui/react";

// Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase_init";

// 👆ここまでインポート

const Header = () => {
  const [user, setUser] = useState("");

  // ↓ログイン判定
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "currentUser");
      setUser(currentUser);
    });
  }, []);

  // ログアウト処理
  const router = useRouter();
  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}

      {/* <div>
        <img src={user.photoURL} />
      </div> */}

      <Box w="390px" bg="#EF9996" px={5}>
        <Flex h="50px" alignItems={"center"} justifyContent={"space-between"}>
          <Menu>
            <MenuButton
              color="white"
              as={IconButton}
              aria-label="Options"
              icon={<AiOutlineMenu />}
              variant="outline"
            />
            <MenuList>
              <MenuItem as="a" href="./">
                Home
              </MenuItem>
              <MenuItem as="a" href="./search">
                スポットを検索する
              </MenuItem>

              <MenuItem as="a" href="./recommend">
                スポットを登録する
              </MenuItem>
              <MenuItem as="a" href="./join">
                新規会員登録
              </MenuItem>
              {/* <MenuDivider />
              <MenuItem as="a" href="./login">
                ログイン
              </MenuItem>
              <MenuItem as="a" href="./mypage">
                マイページ
              </MenuItem> */}
            </MenuList>
          </Menu>
          <Link href="/">
            <MyImage fname="st_logo_white.png" wide={150} />
          </Link>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"sm"} src={""} />
            </MenuButton>
            <MenuList>
              <MenuItem as="p" fontSize="14px" bg="#EF9996">
                <p>{user?.email}</p>
              </MenuItem>
              <MenuItem as="a" href="./login">
                ログイン
              </MenuItem>
              <MenuItem onClick={logout}>ログアウト</MenuItem>
              <MenuDivider />
              <MenuItem as="a" href="./mypage">
                マイページ
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* <>
        <Button onClick={onOpen}>Open Drawer</Button>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </> */}
      </Box>
    </div>
  );
};

export default Header;
