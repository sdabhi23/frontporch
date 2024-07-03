import {
  Box,
  DarkMode,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<MdDarkMode />, <MdLightMode />);
  return (
    <Box>
      <DarkMode>
        <IconButton
          aria-label="dark"
          bg="transparent"
          fontSize="25px"
          icon={icon}
          onClick={toggleColorMode}
        />
      </DarkMode>
    </Box>
  );
};

export default ThemeSwitcher;
