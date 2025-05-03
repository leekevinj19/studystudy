import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";

const gridTemplateLarge = `
  "b b c c"
  "b b c c"
  "b b c c"
  "b b c c"
  "b b c c"
  "a a c c"
  "a a c c"
  "a a c c"
  "a a c c"
  "a a c c"
`;
const gridTemplateSmall = `
  "b"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "c"
  "c"
`;

const Dashboard = () => {
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
              gridTemplateRows: "repeat(3, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLarge,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmall,
            }
      }
    >
      <Row1 />
    </Box>
  );
};

export default Dashboard;
