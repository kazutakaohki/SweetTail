// React
import React, { useRef, useState } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
// React-google-maps
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
// Chakra UI
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  Heading,
  Stack,
  Badge,
  Divider,
} from "@chakra-ui/react";

// 👆ここまでインポート

const center = { lat: 35.66950610122131, lng: 139.70298616931188 };

const markers = [
  {
    id: 1,
    name: "BONDI CAFE",
    spotcategory: "カフェ",
    spotinout: "内○／外○",
    spotparking: "Ｐ無",
    dog: "大型犬",
    position: { lat: 35.6514906, lng: 139.7206433 },
    gbp: "https://www.google.co.jp/maps/place/%E3%83%9C%E3%83%B3%E3%83%80%E3%82%A4+%E3%82%AB%E3%83%95%E3%82%A7/@35.6514906,139.7206433,17z/data=!3m2!4b1!5s0x60188b72be163791:0x17b064c60e14aea4!4m5!3m4!1s0x60188b72bf91fe2b:0x332a10b2f06891d9!8m2!3d35.6514863!4d139.7228373?hl=ja",
  },
  {
    id: 2,
    name: "IVY PLACE",
    spotcategory: "カフェ",
    spotinout: "内○／外○",
    spotparking: "Ｐ無",
    dog: "大型犬",
    position: { lat: 35.6493623, lng: 139.697749 },
    gbp: "https://www.google.co.jp/maps/place/IVY+PLACE/@35.6493623,139.697749,17z/data=!3m2!4b1!5s0x60188b4fc6ac5b49:0x4ceb5b05b48bad60!4m5!3m4!1s0x60188b4fc19afe55:0x79a9e8040e621bf7!8m2!3d35.649358!4d139.699943?hl=ja",
  },
  {
    id: 3,
    name: "anea cafe 白金店",
    spotcategory: "カフェ",
    spotinout: "内○／外○",
    spotparking: "Ｐ無",
    dog: "大型犬",
    position: { lat: 35.6446871, lng: 139.7217495 },
    gbp: "https://www.google.co.jp/maps/place/anea+cafe+%E7%99%BD%E9%87%91%E5%BA%97/@35.6446871,139.7217495,17z/data=!3m2!4b1!5s0x60188b0e5c0c35f5:0xf90babde6e39226d!4m5!3m4!1s0x60188b0e5c0b0001:0x8d2525ef7ff33b46!8m2!3d35.6446828!4d139.7239435?hl=ja",
  },
  {
    id: 4,
    name: "Pizzeria&Trattoria GONZO目黒店",
    spotcategory: "カフェ",
    spotinout: "内○／外○",
    spotparking: "Ｐ無",
    dog: "大型犬",
    position: { lat: 35.6334263, lng: 139.7152407 },
    gbp: "https://www.google.co.jp/maps/place/Pizzeria%26Trattoria+GONZO%E7%9B%AE%E9%BB%92%E5%BA%97/@35.6334263,139.7152407,17z/data=!3m2!4b1!5s0x60188b1c17239f25:0xb7bc0d4cc4866261!4m5!3m4!1s0x60188ba062022d09:0xed93b07659de8f07!8m2!3d35.633422!4d139.7174347?hl=ja",
  },

  {
    id: 7,
    name: "THE B'NC 荻窪タウンセブン店",
    spotcategory: "レジャー",
    spotinout: "屋外",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.70513125300941, lng: 139.6196131845845 },
    gbp: "https://www.google.co.jp/maps/place/BBQ+PARK+THE+B'NC+%E8%8D%BB%E7%AA%AA%E3%82%BF%E3%82%A6%E3%83%B3%E3%82%BB%E3%83%96%E3%83%B3%E5%BA%97/@35.705079,139.617387,17z/data=!3m2!4b1!5s0x5fff941cbface7fd:0x7dbcf12135aedd1d!4m5!3m4!1s0x6018edf9ff879943:0xcfb9281fba7b64d5!8m2!3d35.705079!4d139.619581?hl=ja",
  },
  {
    id: 8,
    name: "TCK BBQガーデン by THE B'NC",
    spotcategory: "レジャー",
    spotinout: "屋外",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.59230912479417, lng: 139.74078208272664 },
    gbp: "https://www.google.co.jp/maps/place/TCK%E3%83%90%E3%83%BC%E3%83%99%E3%82%AD%E3%83%A5%E3%83%BC%E3%82%AC%E3%83%BC%E3%83%87%E3%83%B3+by+THE+B'NC/@35.5922219,139.738631,17z/data=!3m1!4b1!4m5!3m4!1s0x601861a008065749:0x820d97c4967a1afe!8m2!3d35.5922219!4d139.740825?hl=ja",
  },

  {
    id: 14,
    name: "東京スカイツリー",
    spotcategory: "SHOP",
    spotinout: "内×／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.710220311368516, lng: 139.81071592355997 },
    gbp: "https://www.google.co.jp/maps/place/%E6%9D%B1%E4%BA%AC%E3%82%B9%E3%82%AB%E3%82%A4%E3%83%84%E3%83%AA%E3%83%BC/@35.7101593,139.8089457,17z/data=!3m1!5s0x60188ed6f9e7acb7:0x486cece4c5ab3730!4m9!1m2!2m1!1z44K544Kr44Kk44OE44Oq44O8!3m5!1s0x60188ed0d12f9adf:0x7d1d4fb31f43f72a!8m2!3d35.7100627!4d139.8107004!15sChLjgrnjgqvjgqTjg4Tjg6rjg7xaFSIT44K544Kr44KkIOODhOODquODvJIBEG9ic2VydmF0aW9uX2RlY2uaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUkhlazlMVVhKblJSQUI?hl=ja",
  },
  {
    id: 15,
    name: "ぺテモ　アクアシティお台場店",
    spotcategory: "SHOP",
    spotinout: "内○／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.62814464730432, lng: 139.77315789657152 },
    gbp: "https://www.google.co.jp/maps/place/%E3%83%9A%E3%83%86%E3%83%A2%E3%82%A2%E3%82%AF%E3%82%A2%E3%82%B7%E3%83%86%E3%82%A3%E3%81%8A%E5%8F%B0%E5%A0%B4%E5%BA%97/@35.627883,139.7713233,17z/data=!3m1!5s0x601889f63b5b7c73:0xb2ee377a97e5d40!4m9!1m2!2m1!1z44Ki44Kv44Ki44K344OG44Kj44CA44Oa44OD44OI!3m5!1s0x601889f622203aaf:0x890ff17a63e235a6!8m2!3d35.6279521!4d139.7732456!15sCh7jgqLjgq_jgqLjgrfjg4bjgqPjgIDjg5rjg4Pjg4haHyId44Ki44Kv44KiIOOCt-ODhuOCoyDjg5rjg4Pjg4iSARBwZXRfc3VwcGx5X3N0b3Jl?hl=ja",
  },
];

const MapAll = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });
  // const [map, setMap] = useState("");

  // マップ場にマーカーを配置する処理
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  // オートコンプリート、ディレクションを配置する処理

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <HStack>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="390px"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={11}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            // onLoad={handleOnLoad}
            // onClick={() => setActiveMarker(null)}
          >
            {/* テスト追加エリア👇 */}

            {markers.map(
              ({
                id,
                name,
                spotcategory,
                spotinout,
                spotparking,
                dog,
                position,
                gbp,
              }) => (
                <Marker
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                >
                  {activeMarker === id ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <Box>
                        <Heading
                          as="a"
                          href={gbp}
                          target="_blank"
                          rel="noopener noreferrer"
                          mt="5px"
                          ml="5px"
                          mb="5px"
                          fontSize="12px"
                          // fontWeight="bold"
                          textAlign="left"
                        >
                          {name}
                        </Heading>
                        <Divider />
                        <HStack mt="5px" maxW="300px">
                          <Badge colorScheme="pink">{dog}</Badge>
                          <Badge colorScheme="blue">{spotcategory}</Badge>
                          <Badge colorScheme="purple">{spotinout}</Badge>
                          <Badge colorScheme="green">{spotparking}</Badge>
                        </HStack>
                      </Box>
                    </InfoWindow>
                  ) : null}
                </Marker>
              )
            )}

            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}

            {/* テスト追加エリア👆 */}
          </GoogleMap>
        </Box>

        <Box
          w="300px"
          p={2}
          borderRadius="lg"
          m={2}
          bgColor="white"
          shadow="base"
          zIndex="1"
        >
          <Box w="280px">
            <Autocomplete>
              <Input
                h="30px"
                fontSize="14px"
                type="text"
                placeholder="出発地"
                ref={originRef}
              />
            </Autocomplete>
          </Box>
          <Box w="280px" mt="5px">
            <Autocomplete>
              <Input
                h="30px"
                fontSize="14px"
                type="text"
                placeholder="目的地"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <Box justifyContent="flex-start">
            <ButtonGroup mt="5px">
              <Button
                h="30px"
                fontSize="14px"
                alignItems="center"
                colorScheme="pink"
                type="submit"
                onClick={calculateRoute}
              >
                検索
              </Button>
              <IconButton
                h="30px"
                w="30px"
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
              {/* <IconButton
              h="30px"
              w="30px"
              aria-label="center back"
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            /> */}
            </ButtonGroup>
            <HStack spacing={1} mt={1}>
              <Text fontSize="12px" w="140px">
                距離: {distance}{" "}
              </Text>
              <Text fontSize="12px" w="140px">
                時間: {duration}{" "}
              </Text>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </HStack>
  );
};

export default MapAll;
