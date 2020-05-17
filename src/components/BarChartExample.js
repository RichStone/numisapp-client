import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "€",
      backgroundColor: "rgba(50,205,50,0.2)",
      borderColor: "rgba(169,169,169,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

export default function BarChartExample() {
  return (
    <div>
      <h3>Sales per Month</h3>
      <Bar
        data={data}
        width={100}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
