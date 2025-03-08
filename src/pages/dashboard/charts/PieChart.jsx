import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ selectedMatrics, groupedData, COLORS }) => {
  const data = useMemo(() => {
    if (!groupedData || groupedData.length === 0) return null;
    return {
      labels: groupedData?.map((d) => d?.metric),
      datasets: selectedMatrics?.map((mat, index) => ({
        data: groupedData?.map((d) => d[`${mat}_sum`] || 0),
        backgroundColor: COLORS[index % COLORS.length],
        hoverOffset: 4,
      })),
    };
  }, [groupedData]);
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pie Chart" },
    },
  };
  return <Pie data={data} options={options} />;
};

export default PieChart;
