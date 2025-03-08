import React from "react";

const DataTable = ({ data, selectedMetrics }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg">
        {/* Table Head */}
        <thead className="bg-blue-600 text-white sticky top-0">
          <tr>
            <th className="p-3 border border-gray-300">SN</th>
            <th className="p-3 border border-gray-300">Category</th>
            {selectedMetrics?.map((mat, index) => (
              <th key={index}>
                {mat?.split("_")?.map((m) => {
                  return m?.charAt(0).toUpperCase() + m?.slice(1) + " ";
                })}
              </th>
            ))}
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
                key={index}
                className=" dark:even:border-y-gray-800 hover:bg-blue-100 dark:hover:bg-gray-800 transition duration-200"
              >
                <td className="p-3 border border-gray-300 text-center dark:text-white">
                  {index + 1}
                </td>
                <td className="p-3 border border-gray-300  dark:border-gray-50 dark:text-white">
                  {d?.metric}
                </td>
                {selectedMetrics?.map((mat) => (
                  <td className="p-3 border border-gray-300 text-center dark:text-white">
                    {d?.[`${mat}_sum`]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
