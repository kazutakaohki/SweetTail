import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// 追加1. auth
import { db, auth } from "../firebase/firebase_init";
//Firebase ver9 compliant
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import PostUser from "./PostUser";

// 追加2.
import { onAuthStateChanged, getAuth } from "firebase/auth";

const UserInfo = () => {
  const router = useRouter();
  console.log(router, "YY");
  // firebaseに作成した項目を受け取るための変数 = useState
  // 記述1. useStateを準備する

  const [userInfo, setUserInfo] = useState([
    {
      id: "",
      username: "",
      email: "",
      image: "",
      dogname: "",
      dogkinds: "",
      dogage: "",
      doggender: "",
      dogweight: "",
      timestamp: null,
    },
  ]);

  // 記述2.useEffectを使ってデータを取得する
  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const q = query(collection(db, "users"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setUserInfo(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          image: doc.data().image,
          dogname: doc.data().dogname,
          dogkinds: doc.data().dogkinds,
          dogage: doc.data().dogage,
          doggender: doc.data().doggender,
          dogweight: doc.data().dogweight,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  console.log(userInfo, "useStateの中身"); //データの流れを確認しましょう！

  // 追加4.
  useEffect(() => {
    // Firebase ver9 compliant
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "currentUser");
      // setUser(currentUser);
      //userにはログインor登録されているかの状態がtrue/falseで入ってくるので、!userはfalse＝user情報がないとき!
      // !user && props.history.push("login");
      // !user && router.push("/login");
    });

    return () => unSub();
  }, [router]);

  return (
    <div>
      {/* Feed */}

      {/*　記述5. ログアウトの処理 */}
      {/* <button
        onClick={async () => {
          try {
            await signOut(auth);
            // props.history.push("login");
            router("/login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        ログアウト
      </button> */}

      {/* 記述3.Postコンポーネントにデータを流し込む */}
      {/* && は存在するときのみ実行されるという書き方 */}
      {userInfo &&
        userInfo.map((item) => (
          <PostUser
            // ES6(javascript)のmapをReactで使うときは[key]の記述が必須です！
            id={item.id}
            key={item.id}
            username={item.username}
            email={item.email}
            image={item.image}
            dogname={item.dogname}
            dogkinds={item.dogkinds}
            dogage={item.dogage}
            doggender={item.doggender}
            dogweight={item.dogweight}
            timestamp={item.timestamp}
          />
        ))}
      {/*  */}
    </div>
  );
};

export default UserInfo;
