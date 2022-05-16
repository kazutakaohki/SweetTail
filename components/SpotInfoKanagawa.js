import PostSpotInfo from "./postSpotInfo";
// React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Firebase
import { db } from "../firebase/firebase_init";
//Firebase ver9 compliant
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";

// 👆ここまでインポート

const SpotInfoKanagawa = () => {
  const router = useRouter();
  console.log(router, "vv");
  // firebaseに作成した項目を受け取るための変数 = useState
  // 記述1. useStateを準備する
  const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      spotarea: "",
      spotname: "",
      spotaddress: "",
      spottel: "",
      spotcomment: "",
      spotcategory: "",
      spottime: "",
      spotparking: "",
      dog: "",
      link: "",
      timestamp: null,
    },
  ]);

  // 記述2.useEffectを使ってデータを取得する
  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const q = query(
      collection(db, "spotinfo"),
      where("spotarea", "==", "神奈川")
      // orderBy("timestamp", "desc")
    );
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          spotarea: doc.data().spotarea,
          spotname: doc.data().spotname,
          spotaddress: doc.data().spotaddress,
          spottel: doc.data().spottel,
          spotcomment: doc.data().spotcomment,
          spotcategory: doc.data().spotcategory,
          spotinout: doc.data().spotinout,
          spottime: doc.data().spottime,
          spotparking: doc.data().spotparking,
          dog: doc.data().dog,
          link: doc.data().link,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  console.log(posts, "useStateの中身");

  // useEffect(() => {
  //   // Firebase ver9 compliant
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     console.log(user, "user情報をチェック！");
  //     //userにはログインor登録されているかの状態がtrue/falseで入ってくるので、!userはfalse＝user情報がないとき!

  //     // !user && router.push("/login");
  //   });

  //   return () => unSub();
  // }, [router]);

  return (
    <div>
      {/* SpotList */}

      {/* PostSpotコンポーネントにデータを流し込む */}
      {/* && は存在するときのみ実行されるという書き方 */}
      {posts &&
        posts.map((item) => (
          <PostSpotInfo
            // ES6(javascript)のmapをReactで使うときは[key]の記述が必須です！
            id={item.id}
            key={item.id}
            image={item.image}
            spotarea={item.spotarea}
            spotname={item.spotname}
            spotaddress={item.spotaddress}
            spottel={item.spottel}
            spottime={item.spottime}
            spotparking={item.spotparking}
            spotcomment={item.spotcomment}
            spotcategory={item.spotcategory}
            spotinout={item.spotinout}
            dog={item.dog}
            link={item.link}
            // timestamp={item.timestamp}
          />
        ))}
    </div>
  );
};

export default SpotInfoKanagawa;
