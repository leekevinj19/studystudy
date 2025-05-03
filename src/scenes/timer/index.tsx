import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./row1";
import Row2 from "./row2";
import TimerContent from "./TimerContent"

const gridTemplateLarge = `
  "a a a"
  "a a a"
  "a a a"
  "a a a"
  "a a a"
  "b b b"
  "b b b"
  "b b b"
  "b b b"
`;

const gridTemplateSmall = `
  "a"
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
`;

const Timer = () => {
  const isAboveMedium = useMediaQuery("(min-width: 1200px)");
  
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMedium
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(8, minmax(60px, 1fr))",  // Changed to 8 rows
              gridTemplateAreas: gridTemplateLarge,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmall,
            }
      }
    >
      <TimerContent />
      <Row2 />
    </Box>
  );
};

export default Timer;