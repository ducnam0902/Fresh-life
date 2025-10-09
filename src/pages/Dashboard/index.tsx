import React from "react";
import Title from "../../components/Title";
import { Grid } from "@mui/material";
import OverviewCount from "../../components/OverviewCount";

import { LuFileCheck } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdShowChart } from "react-icons/md";

const overviewData = [
  {
    title: "Total Tasks Today",
    count: 2500,
    icon:<LuFileCheck color="#fff" size={40}/>,
    background: "#6aa258",
    titleColor: "#fff",
  },
  {
    title: "Completed Tasks",
    count: 1500,
    icon: <FaCircleCheck size={40} color="#303121"/>,
    background: "#f7f399",
    titleColor: "#303121",
  },
  {
    title: "Remaining Budget",
    count: 1000,
    icon: <BsCurrencyDollar color="#fff" size={40}/>,
    background: "#a3de83",
    titleColor: "#fff",
  },
  {
    title: "Expenses Today",
    count: 1000,
    icon: <MdShowChart color="#fff" size={40}/>,
    background: "#37827b",
    titleColor: "#fff",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title
        title="Dashboard Overview"
        subTitle="Track your daily progress and budget management"
      />
      <Grid container spacing={3}>
        {overviewData.map((data, index) => (
          <Grid key={index} size={3}>
            <OverviewCount
              title={data.title}
              count={data.count}
              icon={data.icon}
              background={data.background}
              titleColor={data.titleColor}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
