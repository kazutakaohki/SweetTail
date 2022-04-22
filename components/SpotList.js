import PostSpot from "./postSpotList";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// 追加1. auth
import { db, auth } from "../firebase/firebase_init";
//Firebase ver9 compliant
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

// 追加2.
import { onAuthStateChanged, signOut } from "firebase/auth";

const SpotList = () => {
  const router = useRouter();
  console.log(router, "vv");
  // firebaseに作成した項目を受け取るための変数 = useState
  // 記述1. useStateを準備する
  const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      spotname: "",
      spotaddress: "",
      spottel: "",
      spotcategory: "",
      spotdetail: "",
      // spotstar: "",
      spotcomment: "",
      timestamp: null,
    },
  ]);

  // 記述2.useEffectを使ってデータを取得する
  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const q = query(collection(db, "spots"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          spotname: doc.data().spotname,
          spotaddress: doc.data().spotaddress,
          spottel: doc.data().spottel,
          spotcategory: doc.data().spotcategory,
          spotdetail: doc.data().spotdetail,
          // spotstar: doc.data().spotstar,
          spotcomment: doc.data().spotcomment,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  console.log(posts, "useStateの中身");

  useEffect(() => {
    // Firebase ver9 compliant
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user, "user情報をチェック！");
      //userにはログインor登録されているかの状態がtrue/falseで入ってくるので、!userはfalse＝user情報がないとき!

      // !user && router.push("/login");
    });

    return () => unSub();
  }, [router]);

  return (
    <div>
      {/* SpotList */}

      {/* PostSpotコンポーネントにデータを流し込む */}
      {/* && は存在するときのみ実行されるという書き方 */}
      {posts &&
        posts.map((item) => (
          <PostSpot
            // ES6(javascript)のmapをReactで使うときは[key]の記述が必須です！
            id={item.id}
            key={item.id}
            image={item.image}
            spotname={item.spotname}
            spotaddress={item.spotaddress}
            spottel={item.spottel}
            spotcategory={item.spotcategory}
            spotdetail={item.spotdetail}
            // spotstar={item.spotstar}
            spotcomment={item.spotcomment}
            // timestamp={item.timestamp}
          />
        ))}
    </div>
  );
};

export default SpotList;
