import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ selectedMatrics, groupedData, fill, COLORS }) => {
  const data = useMemo(() => {
    if (!groupedData || groupedData.length === 0) return null;

    return {
      labels: groupedData.map((data) => data.metric),
      datasets: selectedMatrics.map((mat, index) => {
        const color = COLORS[index % COLORS.length];
        return {
          label: `${mat} Sum`,
          data: groupedData.map((data) => data[`${mat}_sum`] || 0),
          backgroundColor: fill ? `${color}40` : "transparent",
          borderColor: color,
          fill: fill,
          borderWidth: 2,
          tension: 0.4,
        };
      }),
    };
  }, [groupedData, selectedMatrics, fill]);

  console.log(data);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Line Chart" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return data ? (
    <Line options={options} data={data} />
  ) : (
    <p>No data available</p>
  );
};

export default LineChart;
