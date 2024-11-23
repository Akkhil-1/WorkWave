import React from "react";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];

const ProjectTables = () => {
  return (
    <div className="overflow-x-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h5 className="text-2xl font-semibold mb-2">Bookings List</h5>
        <p className="text-sm text-gray-500 mb-4">Overview of the bookings</p>

        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Client Name</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Service</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Time</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Budget</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((tdata, index) => (
              <tr key={index} className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <img
                      src={tdata.avatar}
                      className="rounded-full w-12 h-12"
                      alt="avatar"
                    />
                    <div className="ml-3">
                      <h6 className="text-sm font-medium">{tdata.name}</h6>
                      <span className="text-xs text-gray-500">{tdata.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm">{tdata.project}</td>
                <td className="py-4 px-4">
                  {tdata.status === "pending" ? (
                    <span className="p-2 bg-red-500 rounded-full text-white text-xs inline-block"></span>
                  ) : tdata.status === "holt" ? (
                    <span className="p-2 bg-yellow-500 rounded-full text-white text-xs inline-block"></span>
                  ) : (
                    <span className="p-2 bg-green-500 rounded-full text-white text-xs inline-block"></span>
                  )}
                </td>
                <td className="py-4 px-4 text-sm">{tdata.weeks}</td>
                <td className="py-4 px-4 text-sm">{tdata.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTables;
