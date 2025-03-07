import React from "react";

const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto p-3">
      <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg">
        {/* Table Head */}
        <thead className="bg-blue-600 text-white sticky top-0">
          <tr>
            <th className="p-3 border border-gray-300">SN</th>
            <th className="p-3 border border-gray-300">Category</th>
            <th className="p-3 border border-gray-300">Date</th>
            <th className="p-3 border border-gray-300">Product</th>
            <th className="p-3 border border-gray-300">Region</th>
            <th className="p-3 border border-gray-300">Sales</th>
            <th className="p-3 border border-gray-300">Units Sold</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                className="p-3 border border-gray-300"
                colSpan="7"
                align="center"
              >
                No Data Found
              </td>
            </tr>
          ) : (
            data?.map((d, index) => (
              <tr
                key={d.id}
                className=" dark:even:border-y-gray-800 hover:bg-blue-100 dark:hover:bg-gray-800 transition duration-200"
              >
                <td className="p-3 border border-gray-300 text-center dark:text-white">
                  {index + 1}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-50 dark:text-white">
                  {d.category}
                </td>
                <td className="p-3 border border-gray-300 dark:text-white">
                  {d.date}
                </td>
                <td className="p-3 border border-gray-300 dark:text-white">
                  {d.product}
                </td>
                <td className="p-3 border border-gray-300 dark:text-white">
                  {d.region}
                </td>
                <td className="p-3 border border-gray-300 dark:text-white text-right">
                  ${d.sales.toLocaleString()}
                </td>
                <td className="p-3 border border-gray-300 text-center dark:text-white">
                  {d.units_sold}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
