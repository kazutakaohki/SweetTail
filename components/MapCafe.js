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

const center = { lat: 35.6334263, lng: 139.7152407 };

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
    id: 13,
    name: "ドッグデプト 横浜 港の見える丘公園店",
    spotcategory: "カフェ",
    spotinout: "内○／外○",
    spotparking: "Ｐ無",
    dog: "大型犬",
    position: { lat: 35.446521327586616, lng: 139.652814080386 },
    gbp: "https://www.google.co.jp/maps/place/%E3%83%89%E3%83%83%E3%82%B0%E3%83%87%E3%83%97%E3%83%88+%E6%A8%AA%E6%B5%9C+%E6%B8%AF%E3%81%AE%E8%A6%8B%E3%81%88%E3%82%8B%E4%B8%98%E5%85%AC%E5%9C%92%E5%BA%97/@35.4451229,139.5982258,12z/data=!4m9!1m2!2m1!1z5qiq5rWc44CA54qs!3m5!1s0x60185d1f04dfc17d:0xfdf96a472d1bc80!8m2!3d35.4404957!4d139.6534484!15sCgzmqKrmtZzjgIDniqxaDCIK5qiq5rWcIOeKrJIBCGRvZ19jYWZlmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJMZGs1NlVucDNSUkFC?hl=ja",
  },
];

const MapCafe = () => {
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
    <>
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
              onClick={() => setActiveMarker(null)}
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
    </>
  );
};

export default MapCafe;
