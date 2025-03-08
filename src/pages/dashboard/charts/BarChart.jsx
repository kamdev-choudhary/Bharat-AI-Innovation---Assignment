import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = ["#FFBB28", "#0088FE", "#00C49F", "#FF8042"];

const BarChart = ({ groupedData, selectedMetrics }) => {
  const data = useMemo(() => {
    if (!groupedData || groupedData.length === 0) return null;
    return {
      labels: groupedData?.map((item) => item.metric), // Extract category labels
      datasets: selectedMetrics.map((mat, index) => ({
        label: `${mat} Sum`,
        data: groupedData.map((item) => item[`${mat}_sum`] || 0), // Extract values for each metric
        backgroundColor: COLORS[index],
        borderColor: `rgba(${index * 60}, 162, 235, 1)`,
        borderWidth: 1,
        fill: true,
      })),
    };
  }, [groupedData, selectedMetrics]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Bar Chart" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return data ? (
    <Bar data={data} options={options} />
  ) : (
    <p>No data available</p>
  );
};

export default BarChart;
