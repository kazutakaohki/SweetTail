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

const center = { lat: 35.466173320621934, lng: 139.62204054004542 };

const markers = [
  {
    id: 6,
    name: "THE B'NC 港南台バーズ店",
    spotcategory: "レジャー",
    spotinout: "屋外",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.37514757833266, lng: 139.57747704039397 },
    gbp: "https://www.google.co.jp/maps/place/THE+B%E2%80%99NC%EF%BC%88%E3%82%B6%E3%83%BB%E3%83%90%E3%83%B3%E3%82%AF%EF%BC%89+BBQ+TERRACE+%E6%B8%AF%E5%8D%97%E5%8F%B0%E3%83%90%E3%83%BC%E3%82%BA%E5%BA%97/@35.3749114,139.5753045,17z/data=!3m2!4b1!5s0x601844dceeb86a7b:0x4ceb5b0581eb76d0!4m5!3m4!1s0x601844dced392103:0xf8a8aa5bd4dccf2!8m2!3d35.3749114!4d139.5774985?hl=ja",
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
    id: 12,
    name: "江ノ島シーキャンドル",
    spotcategory: "レジャー",
    spotinout: "内○／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.299890536129375, lng: 139.47839281163257 },
    gbp: "https://www.google.co.jp/maps/place/%E6%B1%9F%E3%81%AE%E5%B3%B6%E3%82%B7%E3%83%BC%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%89%E3%83%AB/@35.2997417,139.4762363,17z/data=!3m1!4b1!4m5!3m4!1s0x60184ee5ce045bbd:0x356c5f13bb58dfb3!8m2!3d35.2997417!4d139.478425?hl=ja",
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

const MapKanagawa = () => {
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
            onLoad={handleOnLoad}
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
                        <Stack direction="row" mt="5px" maxW="300px">
                          <Badge colorScheme="pink">{dog}</Badge>
                          <Badge colorScheme="blue">{spotcategory}</Badge>
                          <Badge colorScheme="purple">{spotinout}</Badge>
                          <Badge colorScheme="green">{spotparking}</Badge>
                        </Stack>
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

export default MapKanagawa;
