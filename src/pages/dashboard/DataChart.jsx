import React, { useMemo, useState } from "react";
import { CancelRounded } from "@mui/icons-material";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import AreaChart from "./charts/AreaChart";
import PieChart from "./charts/PieChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const metrics = ["sales", "units_sold"];

const dimension = ["product", "category", "region", "date"];

const DataChart = ({ data }) => {
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [selectedMatrics, setSelectedMatrics] = useState([]);
  const [selectedDimentions, setSelectedDimentions] = useState([]);

  const groupedData = useMemo(() => {
    if (selectedDimentions.length === 0) {
      const summary = selectedMatrics.reduce((acc, mat) => {
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
        selectedMatrics.forEach((mat) => {
          group[`${mat}_sum`] = (group[`${mat}_sum`] || 0) + (item[mat] || 0);
        });

        return acc;
      }, []);

      return grouped;
    }
  }, [selectedDimentions, selectedMatrics, data]);

  return (
    <div className="p-3">
      {/* Chart Type Selection Buttons */}
      <div className="dark:text-white w-fit border rounded-md ">
        {["bar", "line", "area", "pie"]?.map((type, index) => (
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

      {/* Render Selected Chart */}
      <div className="mt-5 flex flex-wrap w-full">
        <div className="flex-1 justify-start min-w-80">
          {selectedChartType === "bar" && (
            <BarChart
              groupedData={groupedData}
              selectedMatrics={selectedMatrics}
              COLORS={COLORS}
            />
          )}

          {selectedChartType === "line" && groupedData.length > 0 && (
            <LineChart
              groupedData={groupedData}
              selectedMatrics={selectedMatrics}
              COLORS={COLORS}
            />
          )}

          {selectedChartType === "area" && (
            <LineChart
              groupedData={groupedData}
              selectedMatrics={selectedMatrics}
              fill={"origin"}
              COLORS={COLORS}
            />
          )}

          {selectedChartType === "pie" && selectedMatrics.length > 0 && (
            <PieChart
              groupedData={groupedData}
              selectedMatrics={selectedMatrics}
              COLORS={COLORS}
            />
          )}
        </div>
        <div className="flex-1 p-2 flex flex-col w-[100%] gap-4">
          <div className="w-full ">
            <p className="dark:text-white">Metrics</p>
            <div className="border dark:border-gray-50 p-1 rounded-md w-full h-auto">
              {selectedMatrics?.map((m) => (
                <div className="p-2 flex gap-4 dark:text-white" key={m}>
                  <p>{m}</p>
                  <CancelRounded
                    onClick={() =>
                      setSelectedMatrics((matrics) =>
                        matrics.filter((mat) => mat !== m)
                      )
                    }
                    size={20}
                  />
                </div>
              ))}

              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const index = selectedMatrics.indexOf(value);
                  if (index === -1) {
                    setSelectedMatrics((matrics) => [...matrics, value]);
                  }
                }}
                value=""
                className="w-fit border rounded px-2 py-1 dark:bg-gray-900 dark:border-gray-50 dark:text-white"
              >
                <option className="dark:bg-gray-950 dark:text-white " value="">
                  Select Metrics
                </option>{" "}
                {/* Placeholder */}
                {metrics
                  ?.filter((mat) => !selectedMatrics.includes(mat))
                  .map((m, index) => (
                    <option key={index} value={m}>
                      {m}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="w-full ">
            <p className="dark:text-white">Dimentions</p>
            <div className="border dark:border-gray-50 p-1 rounded-md w-full h-auto">
              {selectedDimentions?.map((d) => (
                <div className="p-2 flex gap-4 dark:text-white" key={d}>
                  <p>{d}</p>
                  <CancelRounded
                    onClick={() =>
                      setSelectedDimentions((dimension) =>
                        dimension?.filter((dim) => dim !== d)
                      )
                    }
                    size={20}
                  />
                </div>
              ))}

              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const index = selectedDimentions.indexOf(value);
                  if (index === -1) {
                    setSelectedDimentions((dimension) => [...dimension, value]);
                  }
                }}
                value=""
                className="w-fit border rounded px-2 py-1 dark:bg-gray-900 dark:text-white"
              >
                <option value="">Select Dimention</option> {/* Placeholder */}
                {dimension
                  ?.filter((dim) => !selectedDimentions.includes(dim))
                  .map((d, index) => (
                    <option key={index} value={d}>
                      {d}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataChart;
