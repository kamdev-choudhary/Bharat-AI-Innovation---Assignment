import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import data from "../../data/sales_data.json";

const Dashboard = () => {
  const [dates, setDates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);

  //   Selected
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedregion, setSelectedregion] = useState("");

  useEffect(() => {
    const uniqueDates = new Set();
    const uniqueCategories = new Set();
    const uniqueRegions = new Set();

    data.forEach((d) => {
      uniqueDates.add(d.date);
      uniqueCategories.add(d.category);
      uniqueRegions.add(d.region);
    });
    setDates([...uniqueDates]);
    setCategories([...uniqueCategories]);
    setRegions([...uniqueRegions]);
  }, []);

  console.log(dates);

  const filteredData = useMemo(() => {
    return data.filter((d) => {
      const dateMatch = !selectedDate || d.date === selectedDate;
      return dateMatch;
    });
  }, [data, selectedDate]);

  return (
    <div>
      <Navbar />
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="">Select Date</option>
        {dates?.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
      <div>
        {filteredData?.map((data) => (
          <div className="bg-purple-100 mb-2 p-4 m-3 rounded-xl" key={data.id}>
            <p>{data.id}</p>
            <p>{data.category}</p>
            <p>{data.date}</p>
            <p>{data.product}</p>
            <p>{data.region}</p>
            <p>{data.sales}</p>
            <p>{data.units_sold}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
