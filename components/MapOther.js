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
    id: 0,
    name: "G's Academy Tokyo",
    spotcategory: "その他",
    spotinout: "内○／外○",
    spotparking: "Ｐ無",
    dog: "大型犬",
    position: { lat: 35.66950610122131, lng: 139.70298616931188 },
    gbp: "https://www.google.co.jp/maps/place/%E3%82%B8%E3%83%BC%E3%82%BA%E3%82%A2%E3%82%AB%E3%83%87%E3%83%9F%E3%83%BC%E6%9D%B1%E4%BA%AC/@35.6693318,139.7008082,17z/data=!3m2!4b1!5s0x60188c9faa7aaa35:0x2da99720d47388cf!4m5!3m4!1s0x60188c9fa9e2e881:0x35396adb5ba7ce03!8m2!3d35.6693318!4d139.7029969?hl=ja",
  },
];

const MapOther = () => {
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
            zoom={13}
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

export default MapOther;
