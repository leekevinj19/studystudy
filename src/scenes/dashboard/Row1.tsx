import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useTheme } from "@mui/material";
import Timer from "@/scenes/timer/TimerContent";
import TaskList from "@/scenes/tasklist/TasklistContent";

const Row1 = () => {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="History (LOG)"
          subtitle="Previous Session Data"
          sideText="reee"
        />
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
