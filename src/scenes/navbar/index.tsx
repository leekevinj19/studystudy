import { useState } from "react";
import { Link } from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <MenuBookIcon sx={{ fontSize: "29px" }} />
        <Typography variant="h4" fontSize="16px">
          Study Harder
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/" //where it takes us
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/timer" //where it takes us
            onClick={() => setSelected("timer")}
            style={{
              color: selected === "timer" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Timer
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/tasklist"
            onClick={() => setSelected("tasklist")}
            style={{
              color: selected === "tasklist" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Task List
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
