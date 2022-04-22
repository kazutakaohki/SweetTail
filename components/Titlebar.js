import React from "react";
import { Text } from "@chakra-ui/react";

const TitleBar = ({ title }) => {
  return (
    <Text
      w="390px"
      mt="10px"
      background="#747171"
      color="white"
      fontSize="13px"
      fontWeight="bold"
      lineHeight="30px"
      textAlign="left"
      alignItems="center"
    >
      {title}
    </Text>
  );
};

export default TitleBar;
