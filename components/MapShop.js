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

const center = { lat: 35.62814464730432, lng: 139.77315789657152 };

const markers = [
  {
    id: 9,
    name: "三井アウトレットパーク 木更津",
    spotcategory: "ショップ",
    spotinout: "内○／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.43528841417211, lng: 139.93446311524994 },
    gbp: "https://www.google.co.jp/maps/place/%E4%B8%89%E4%BA%95%E3%82%A2%E3%82%A6%E3%83%88%E3%83%AC%E3%83%83%E3%83%88%E3%83%91%E3%83%BC%E3%82%AF+%E6%9C%A8%E6%9B%B4%E6%B4%A5/@35.4350961,139.9322315,17z/data=!3m1!4b1!4m12!1m6!3m5!1s0x60187389bfd2af2f:0x96af6b2ec8336c2!2z5LiJ5LqV44Ki44Km44OI44Os44OD44OI44OR44O844KvIOacqOabtOa0pQ!8m2!3d35.4350961!4d139.9344202!3m4!1s0x60187389bfd2af2f:0x96af6b2ec8336c2!8m2!3d35.4350961!4d139.9344202?hl=ja",
  },
  {
    id: 10,
    name: "Out Tail Dog Outdoor Gear",
    spotcategory: "ショップ",
    spotinout: "内○／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.39063333177327, lng: 139.9628942908651 },
    gbp: "https://www.google.co.jp/maps/place/Out+Tail+Dog+Outdoor+Gear/@35.3811167,139.8214453,11z/data=!4m9!1m2!2m1!1z54qs44CA44K344On44OD44OU44Oz44Kw!3m5!1s0x60188b6b6e75eb97:0x30ded3e5b712fdd4!8m2!3d35.381043!4d139.9614958!15sChjniqzjgIDjgrfjg6fjg4Pjg5Tjg7PjgrBaGCIW54qsIOOCt-ODp-ODg-ODlOODs-OCsJIBEHBldF9zdXBwbHlfc3RvcmWaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUkxNazF4VmxobkVBRQ?hl=ja",
  },
  {
    id: 11,
    name: "横浜ベイクォーター",
    spotcategory: "ショップ",
    spotinout: "内○／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.466747014104406, lng: 139.6266435134855 },
    gbp: "https://www.google.co.jp/maps/place/%E6%A8%AA%E6%B5%9C%E3%83%99%E3%82%A4%E3%82%AF%E3%82%A9%E3%83%BC%E3%82%BF%E3%83%BC/@35.4666247,139.6244119,17z/data=!3m2!4b1!5s0x60185c14f99334df:0x1e959cd8635a64b5!4m5!3m4!1s0x60185c3f1bdc3ccb:0x642a785d6ce6a9ed!8m2!3d35.4666247!4d139.6266006?hl=ja",
  },

  {
    id: 14,
    name: "東京スカイツリー",
    spotcategory: "ショップ",
    spotinout: "内×／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.710220311368516, lng: 139.81071592355997 },
    gbp: "https://www.google.co.jp/maps/place/%E6%9D%B1%E4%BA%AC%E3%82%B9%E3%82%AB%E3%82%A4%E3%83%84%E3%83%AA%E3%83%BC/@35.7101593,139.8089457,17z/data=!3m1!5s0x60188ed6f9e7acb7:0x486cece4c5ab3730!4m9!1m2!2m1!1z44K544Kr44Kk44OE44Oq44O8!3m5!1s0x60188ed0d12f9adf:0x7d1d4fb31f43f72a!8m2!3d35.7100627!4d139.8107004!15sChLjgrnjgqvjgqTjg4Tjg6rjg7xaFSIT44K544Kr44KkIOODhOODquODvJIBEG9ic2VydmF0aW9uX2RlY2uaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUkhlazlMVVhKblJSQUI?hl=ja",
  },
  {
    id: 15,
    name: "ぺテモ　アクアシティお台場店",
    spotcategory: "ショップ",
    spotinout: "内○／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.62814464730432, lng: 139.77315789657152 },
    gbp: "https://www.google.co.jp/maps/place/%E3%83%9A%E3%83%86%E3%83%A2%E3%82%A2%E3%82%AF%E3%82%A2%E3%82%B7%E3%83%86%E3%82%A3%E3%81%8A%E5%8F%B0%E5%A0%B4%E5%BA%97/@35.627883,139.7713233,17z/data=!3m1!5s0x601889f63b5b7c73:0xb2ee377a97e5d40!4m9!1m2!2m1!1z44Ki44Kv44Ki44K344OG44Kj44CA44Oa44OD44OI!3m5!1s0x601889f622203aaf:0x890ff17a63e235a6!8m2!3d35.6279521!4d139.7732456!15sCh7jgqLjgq_jgqLjgrfjg4bjgqPjgIDjg5rjg4Pjg4haHyId44Ki44Kv44KiIOOCt-ODhuOCoyDjg5rjg4Pjg4iSARBwZXRfc3VwcGx5X3N0b3Jl?hl=ja",
  },
];

const MapShop = () => {
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
            zoom={10}
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

export default MapShop;
