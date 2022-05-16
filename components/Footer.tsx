import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import MyImage from "./MyImage";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
  return (
    <Box
      w="390px"
      mt="10px"
      bg="#EF9996"
      // color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"4xl"}
        py={2}
        spacing={1}
        justify={"center"}
        align={"center"}
      >
        <Link href=".">
          <MyImage fname="st_logo_white.png" wide={150} />
        </Link>

        <Stack direction={"row"} spacing={6} color={"white"}>
          <SocialButton label={"Twitter"} href={"#"}>
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"Facebook"}
            href={"https://www.facebook.com/profile.php?id=100080875051145"}
          >
            <FaFacebook />
          </SocialButton>
          <SocialButton
            label={"Instagram"}
            href={"https://www.instagram.com/sweettail_dog/"}
          >
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={"solid"} borderColor="white">
        <Container
          as={Stack}
          maxW="390px"
          py={3}
          direction={{ base: "column", md: "" }}
          spacing={2}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Stack direction={"row"} spacing={6} color="white">
            <Link href={"#"}>Home</Link>
            <Link href={"#"}>About</Link>
            <Link href={"#"}>Blog</Link>
            <Link href={"#"}>Contact</Link>
          </Stack>

          <Text color="white">© 2022 SweetTail All rights reserved</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
