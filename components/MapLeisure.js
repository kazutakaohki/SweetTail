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
    id: 5,
    name: "THE B'NC イオンモール幕張新都心",
    spotcategory: "レジャー",
    spotinout: "屋外",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.65343161845624, lng: 140.02987321584666 },
    gbp: "https://www.google.co.jp/maps/place/BBQ%EF%BC%86CAMP+THE+B%E2%80%99NC+%E3%82%A4%E3%82%AA%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%AB%E5%B9%95%E5%BC%B5%E6%96%B0%E9%83%BD%E5%BF%83/@35.6534251,140.0276819,17z/data=!3m1!4b1!4m5!3m4!1s0x602281216d5d9305:0xc447c5df7aaba2ce!8m2!3d35.6534251!4d140.0298759?hl=ja",
  },
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
    id: 16,
    name: "浦安ドッグラン",
    spotcategory: "レジャー",
    spotinout: "内○／外○",
    spotparking: "Ｐ有",
    dog: "大型犬",
    position: { lat: 35.62828520620781, lng: 139.8953291558179 },
    gbp: "https://www.google.co.jp/maps/place/%E6%B5%A6%E5%AE%89%E3%83%89%E3%83%83%E3%82%B0%E3%83%A9%E3%83%B3/@35.6281893,139.893119,17z/data=!3m1!4b1!4m5!3m4!1s0x60187d000ea330a9:0x7aef05b6b95fc5c7!8m2!3d35.6281893!4d139.8953077?hl=ja",
  },
];

const MapLeisure = () => {
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
  );
};

export default MapLeisure;
