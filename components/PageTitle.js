import React from "react";
import { Text } from "@chakra-ui/react";

const PageTitle = ({ title }) => {
  return (
    <Text
      w="390px"
      mt="10px"
      color="#747171"
      fontSize="16px"
      fontWeight="bold"
      lineHeight="30px"
      textAlign="center"
      alignItems="center"
    >
      {title}
    </Text>
  );
};

export default PageTitle;
