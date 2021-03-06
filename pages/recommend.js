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

// ðããã¾ã§ã¤ã³ãã¼ã

const Recommend = () => {
  // useStateãæºåãç»åãä¿æãããå¥åãããæå­ãä¿æãã
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
    console.log(e.target.files[0], "ç»å");
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  // éä¿¡
  //å¾ã§ä¸­èº«ãè¨è¿°
  const sendClick = (e) => {
    // 1.
    e.preventDefault();
    if (image) {
      //å¾ã§è¨è¿°

      // ç»å + ãã­ã¹ãã®å¦ç
      // firebaseã®ä»æ§ã§åããã¡ã¤ã«åã®ç»åãè¤æ°åã¢ãããã¦ãã¾ãã¨åã®ãã¡ã¤ã«ãåé¤ããã
      // ãã®ããã«ãã¡ã¤ã«åãã©ã³ãã ã«ä½æããå¿è¦ãããã®ã§ãjsã®ãã¯ããã¯ãã§ã©ã³ãã ãªæå­åãä½æ
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ã©ã³ãã ãªæå­åãä½ãããã®åè£62æå­
      const N = 16;

      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N))) //ä¹±æ°ãçæãã¦ããããã®ã§0ããã©ã³ãã ãªæ°å­ã16åé¸ã°ãã
        .map((n) => S[n % S.length])
        .join("");

      const fileName = randomChar + "_" + image.name;

      //Firebase ver9 compliant (firebase strageã«ç»é²ãã¦ããç®æâ)
      const uploadImage = uploadBytesResumable(
        ref(storage, `images/${fileName}`),
        image
      );

      // ç»åã¨ãã­ã¹ããfirestoreã®æ¹ã«éãè¨è¿°
      //Firebase ver9 compliant
      uploadImage.on(
        "state_changed",
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          //Firebase ver9 compliant
          //ãã¡ã¤ã«å 12345 +  morita = 12345morita
          //ref(storage, `images/${fileName}`) ï¼
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
    // useStateãç©ºã«ãã=å¥åæ¬ãç©ºç½ã«ããå¦ç
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

  const router = useRouter(); //useRouterããã¯ãå®ç¾©

  return (
    <div>
      <Header />
      <PageTitle title="ãªã¹ã¹ã¡ã®ãåºããã¹ããããç»é²ãã" />
      <TitleBar title="ã1.åçãç»é²ãã" />

      <form onSubmit={sendClick}>
        {/* ç»åãç»é²ããâstorage */}
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

        <TitleBar title="ã2.ä½æã»é£çµ¡åãç»é²ãã" />

        {/* ã¹ãããã®ä½æç­ã®æå ±ãç»é²ããâdatabase */}

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
            placeholder="åããç§°"
            value={spotnameValue}
            onChange={(e) => setSpotnameValue(e.target.value)}
          />

          <Input
            type="text"
            placeholder="ä½ããæ"
            value={spotaddressValue}
            onChange={(e) => setSpotaddressValue(e.target.value)}
          />

          <Input
            type="tel"
            placeholder="é»è©±çªå·"
            value={spottelValue}
            onChange={(e) => setSpottelValue(e.target.value)}
          />

          <Input
            type="text"
            placeholder="å¶æ¥­æé"
            value={spottimeValue}
            onChange={(e) => setSpottimeValue(e.target.value)}
          />

          <Select
            color="gray.400"
            placeholder="ã«ãã´ãªã¼ãé¸æ"
            value={spotcategoryValue}
            onChange={(e) => setSpotcategoryValue(e.target.value)}
          >
            <option value="ã«ãã§">ã«ãã§</option>
            <option value="ã·ã§ãã">ã·ã§ãã</option>
            <option value="ã¬ã¸ã£ã¼">ã¬ã¸ã£ã¼</option>
            <option value="ãã®ä»">ãã®ä»</option>
          </Select>

          <Select
            color="gray.400"
            placeholder="åºåï¼ãã©ã¹ï¼å±åï¼å±å¤ï¼"
            value={spotinoutValue}
            onChange={(e) => setSpotinoutValue(e.target.value)}
          >
            <option value="åºåâï¼ãã©ã¹â">åºåâï¼ãã©ã¹â</option>
            <option value="åºåÃï¼ãã©ã¹â">åºåÃï¼ãã©ã¹â</option>
            <option value="åºåâï¼ãã©ã¹Ã">åºåâï¼ãã©ã¹Ã</option>
            <option value="å±å¤">å±å¤</option>
            <option value="å±å">å±å</option>
            <option value="ãã®ä»">ãã®ä»</option>
          </Select>

          <Select
            color="gray.400"
            placeholder="é§è»å ´æç¡"
            value={spotparkingValue}
            onChange={(e) => setSpotparkingValue(e.target.value)}
          >
            <option value="ï¼°ç¡ã">ï¼°ç¡ã</option>
            <option value="ï¼°æã">ï¼°æã</option>
          </Select>

          <Select
            color="gray.400"
            placeholder="ä¸ç·ã«è¡ããç¬ã®ãµã¤ãº"
            value={dogValue}
            onChange={(e) => setDogValue(e.target.value)}
          >
            <option value="å°åç¬">å°åç¬</option>
            <option value="ä¸­åç¬">ä¸­åç¬</option>
            <option value="å¤§åç¬">å¤§åç¬</option>
          </Select>
        </Stack>

        <TitleBar title="ã3.ããããæå ±ãç»é²ãã" />

        {/* ã¬ã¼ãã£ã³ã° */}
        {/* <HStack mt="10px">
          <Text ml="26px" mr="20px" fontWeight="bold" color="gray.400">
            ããããåº¦
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
            placeholder="ããããã³ã¡ã³ã"
            value={spotcommentValue}
            onChange={(e) => setSpotcommentValue(e.target.value)}
          />
          <Text fontSize="10px" textAlign="center" mt="5px" w="325px">
            ãç»é²é ããã¹ãããæå ±ã¯äºåå±ã§ç¢ºèªå¾ã«åæ ããã¾ã
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
              ã­ã£ã³ã»ã«
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
              ç»é²ãã
            </Button>
          </HStack>
        </Stack>
      </form>

      <Footer />
    </div>
  );
};

export default Recommend;
