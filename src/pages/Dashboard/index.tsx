import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { Grid } from "@mui/material";
import OverviewCount from "../../components/OverviewCount";
import { CiWallet } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { useAuth } from "../../hooks/useAuth";
import theme from "../../utils/theme";
import taskServices from "../../services/taskServices";
import useLoading from "../../store/useLoading";
import type { OverviewCountTask } from "../../types/task.types";

const Dashboard: React.FC = () => {
  const user = useAuth();
  const { setLoading } = useLoading();

  const [overviewCountData, setOverviewCountData] =
    useState<OverviewCountTask | null>(null);
  useEffect(() => {
    const fetchOverviewCountData = async () => {
      try {
        setLoading(true);
        const data = await taskServices.countTask(user?.uid || "");
        setOverviewCountData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewCountData();
  }, [user?.uid]);

  return (
    <div>
      <Title
        title={`Welcome back, ${user?.displayName || "User"}`}
        subTitle="Track your daily progress and budget management"
      />
      <Grid container spacing={3}>
        <Grid key={0} size={4}>
          <OverviewCount
            title={"Daily Budget Remaining"}
            count={overviewCountData?.total ?? 0}
            icon={
              <CiWallet color={theme.palette.primary.textLight} size={25} />
            }
            currency="VND"
          />
        </Grid>
        <Grid key={1} size={4}>
          <OverviewCount
            title={"Tasks Completed Today"}
            count={overviewCountData?.completed ?? 0}
            icon={
              <CiCircleCheck
                size={25}
                color={theme.palette.primary.textLight}
              />
            }
          />
        </Grid>
        <Grid key={2} size={4}>
          <OverviewCount
            title={"Pending Tasks"}
            count={overviewCountData?.pending ?? 0}
            icon={
              <CiClock1 size={25} color={theme.palette.primary.textLight} />
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
