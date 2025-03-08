import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DataChart from "./DataChart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   Selected
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const categories = useMemo(
    () => (data ? [...new Set(data?.map((d) => d.category))] : []),
    [data]
  );

  const regions = useMemo(
    () => (data ? [...new Set(data?.map((d) => d.region))] : []),
    [data]
  );

  // Mimic fetch api using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (error) setError("");
        const response = await axios.get("./sales_data.json");
        if (response.status === 200) {
          setData(response.data);
        } else {
          setError("Error Fetching data");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!data) return [];
    const selectedStartDate = startDate
      ? new Date(startDate).setHours(0, 0, 0, 0)
      : null;
    const selectedEndDate = endDate
      ? new Date(endDate).setHours(23, 59, 59, 999)
      : null;

    return data.filter((d) => {
      const itemDate = new Date(d.date).setHours(0, 0, 0, 0);
      const startDateMatch =
        !selectedStartDate || itemDate >= selectedStartDate;
      const endDateMatch = !selectedEndDate || itemDate <= selectedEndDate;
      const categoryMatch =
        !selectedCategory || d.category === selectedCategory;
      const regionMatch = !selectedRegion || d.region === selectedRegion;

      return startDateMatch && endDateMatch && categoryMatch && regionMatch;
    });
  }, [data, selectedCategory, selectedRegion, startDate, endDate]);

  return (
    <div>
      <Navbar />
      <div className=" flex gap-2 flex-wrap p-3 ">
        <div className="flex flex-col">
          <label htmlFor="endDate" className="dark:text-white">
            Start Date
          </label>
          <input
            placeholder="Select Start Date"
            type="date"
            value={startDate}
            className="min-w-80 border p-2 rounded-md   dark:text-white border-gray-400 dark:border-gray-100 flex-1 scroll-smooth"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="endDate" className="dark:text-white">
            End Date
          </label>
          <input
            className="min-w-80 border p-2 rounded-md dark:border-gray-50 dark:text-white border-gray-400 flex-1 scroll-smooth"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            id="endDate"
            placeholder="End Date"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="dark:text-white">
            Category
          </label>
          <select
            className="min-w-80 border p-2 rounded-md dark:border-gray-50 dark:text-white border-gray-400 flex-1 scroll-smooth"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option className="dark:bg-gray-900" value="">
              Select Category
            </option>
            {categories?.map((category, index) => (
              <option className="dark:bg-gray-900" key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="region" className="dark:text-white">
            Region
          </label>

          <select
            className="min-w-80 border p-2 rounded-md dark:text-white border-gray-400 flex-1 scroll-smooth"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            id="region"
          >
            <option className="dark:bg-gray-900" value="">
              Select Region
            </option>
            {regions?.map((region, index) => (
              <option className="dark:bg-gray-900" key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-3">Loading Data....</div>
      ) : data.length === 0 ? (
        error ? (
          <p>{error}</p>
        ) : (
          <p>No Data Found</p>
        )
      ) : (
        <>
          <DataChart data={filteredData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
