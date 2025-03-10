import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ selectedMetrics, groupedData, COLORS }) => {
  const data = useMemo(() => {
    if (!groupedData || groupedData.length === 0) return null;
    return {
      labels: groupedData?.map((d) => d?.metric),
      datasets: selectedMetrics?.map((mat) => ({
        data: groupedData?.map((d) => d[`${mat}_sum`] || 0),
        backgroundColor: groupedData.map((_, i) => COLORS[i % COLORS.length]),
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

  return data ? <Pie data={data} options={options} /> : null;
};

export default PieChart;
