import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useTheme } from "@mui/material";
import Timer from "@/scenes/timer/TimerContent";
import Row2 from "@/scenes/timer/row2";
import TaskList from "@/scenes/tasklist/TasklistContent";

const Row1 = () => {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <>
      <DashboardBox gridArea="a">
        <Row2 />
      </DashboardBox>

      <DashboardBox gridArea="b">
        <Timer />
      </DashboardBox>

      <DashboardBox gridArea="c">
        <TaskList />
      </DashboardBox>
    </>
  );
};

export default Row1;
