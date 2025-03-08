import React, { useMemo, useState } from "react";
import { CancelRounded } from "@mui/icons-material";
import BarChart from "./charts/BarChart";
import LineAndAreaChart from "./charts/LineAndAreaChart";
import PieChart from "./charts/PieChart";
import DataTable from "./DataTable";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
];

const metrics = ["sales", "units_sold"];

const dimentions = ["product", "category", "region", "date"];

const chartTypes = ["bar", "line", "area", "pie"];

const Selection = ({
  title = "title",
  selectedItems = [],
  setSelectedItem,
  items = [],
}) => {
  return (
    <div className="w-full">
      <p className="dark:text-white font-bold text-xl mb-2">{title}</p>
      <div className="border dark:border-gray-50 p-3 rounded-md w-full h-auto">
        {selectedItems?.map((item) => (
          <div
            className="p-2  flex gap-4 dark:text-white w-full justify-between bg-gray-300 dark:bg-gray-600 mb-3 rounded-md"
            key={item}
          >
            <p>{item}</p>
            <CancelRounded
              onClick={() =>
                setSelectedItem((prev) => prev?.filter((mat) => mat !== item))
              }
              size={20}
              className="cursor-pointer"
            />
          </div>
        ))}

        <select
          onChange={(e) => {
            const value = e.target.value;
            const index = selectedItems?.indexOf(value);
            if (index === -1) {
              setSelectedItem((matrics) => [...matrics, value]);
            }
          }}
          value=""
          className="w-full border rounded px-2 py-1 dark:bg-gray-900 dark:border-gray-50 dark:text-white"
        >
          <option className="dark:bg-gray-950 dark:text-white " value="">
            Select {title}
          </option>
          {items
            ?.filter((mat) => !selectedItems.includes(mat))
            .map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

const DataGrid = ({ data }) => {
  const [selectedChartType, setSelectedChartType] = useState(chartTypes[0]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedDimentions, setSelectedDimentions] = useState([]);

  const [dataVisibleType, setDataVisibleType] = useState("chart");

  const groupedData = useMemo(() => {
    if (selectedMetrics.length === 0) return [];
    if (selectedDimentions.length === 0) {
      const summary = selectedMetrics?.reduce((acc, mat) => {
        acc[`${mat}_sum`] = data.reduce(
          (sum, item) => sum + (item[mat] || 0),
          0
        );
        return acc;
      }, {});

      return [{ metric: "Total", ...summary }];
    } else {
      const grouped = data.reduce((acc, item) => {
        const key = selectedDimentions.map((dim) => item[dim]).join(" | ");

        let group = acc.find((g) => g.metric === key);
        if (!group) {
          group = { metric: key };
          acc.push(group);
        }

        selectedMetrics.forEach((mat) => {
          group[`${mat}_sum`] = (group[`${mat}_sum`] || 0) + (item[mat] || 0);
        });

        return acc;
      }, []);

      return grouped;
    }
  }, [selectedDimentions, selectedMetrics, data]);

  const RenderElement = {
    bar: (
      <BarChart
        groupedData={groupedData}
        selectedMetrics={selectedMetrics}
        COLORS={COLORS}
      />
    ),
    line: (
      <LineAndAreaChart
        groupedData={groupedData}
        selectedMetrics={selectedMetrics}
        COLORS={COLORS}
      />
    ),
    area: (
      <LineAndAreaChart
        groupedData={groupedData}
        selectedMetrics={selectedMetrics}
        COLORS={COLORS}
        fill
      />
    ),
    pie: (
      <PieChart
        groupedData={groupedData}
        selectedMetrics={selectedMetrics}
        COLORS={COLORS}
      />
    ),
  };

  return (
    <div className="p-3">
      {/* Render Selected Chart */}
      <div className="mt-5 flex flex-wrap w-full">
        <div className="flex-2/3 justify-start min-w-80 flex flex-col gap-3">
          <div className="flex  justify-between bg-gray-600 dark:bg-gray-600 text-white  rounded-md mb-2">
            {["chart", "table"].map((key, index) => (
              <button
                key={index}
                className={`first:rounded-tl-md flex-1 p-2 last:rounded-tr-md last:rounded-br-md first:rounded-bl-md text-center cursor-pointer ${
                  dataVisibleType === key
                    ? "bg-gray-800 font-bold dark:bg-gray-800 rounded-md"
                    : ""
                }`}
                onClick={() => setDataVisibleType(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Chart Type Selection Buttons */}
          {dataVisibleType === "chart" ? (
            <>
              <div className="dark:text-white w-fit border rounded-md ">
                {chartTypes?.map((type, index) => (
                  <button
                    className={`${
                      type === selectedChartType
                        ? " border-gray-900  bg-purple-500 dark:bg-purple-950 text-white"
                        : ""
                    } p-2 transition-all min-w-20 border-r-1 first:rounded-tl-md first:rounded-bl-md last:rounded-br-md last:rounded-tr-md last:border-r-0 cursor-pointer`}
                    key={index}
                    onClick={() => setSelectedChartType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              <div className="max-h-100 flex justify-center">
                {RenderElement[selectedChartType]}
              </div>
            </>
          ) : (
            <DataTable data={groupedData} selectedMetrics={selectedMetrics} />
          )}
        </div>

        <div className="flex-1/3 p-2 flex flex-col w-[100%] gap-4 md:px-10">
          <Selection
            title="Metrics"
            selectedItems={selectedMetrics}
            items={metrics}
            setSelectedItem={setSelectedMetrics}
          />

          <Selection
            title="Dimentions"
            selectedItems={selectedDimentions}
            items={dimentions}
            setSelectedItem={setSelectedDimentions}
          />
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
