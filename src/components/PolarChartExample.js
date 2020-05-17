import React from "react";
import { Polar } from "react-chartjs-2";

const data = {
  datasets: [
    {
      data: [20, 32, 14, 6, 28],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
      label: "My dataset", // for legend
    },
  ],
  labels: [
    "Banknotes",
    "Gold Coins",
    "Euro Coins",
    "Accessories",
    "Antique Coins",
  ],
};

export default function PolarChartExample() {
  return (
    <div>
      <h3>Income Categories in %</h3>
      <Polar data={data} />
    </div>
  );
}
