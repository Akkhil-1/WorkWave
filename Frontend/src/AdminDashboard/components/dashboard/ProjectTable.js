import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Input } from "reactstrap";
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
    date: new Date("2024-11-01"),
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "approved",
    weeks: "35",
    budget: "95K",
    date: new Date("2024-11-05"),
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "cancelled",
    weeks: "35",
    budget: "95K",
    date: new Date("2024-11-07"),
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
    date: new Date("2024-11-10"),
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "approved",
    weeks: "35",
    budget: "95K",
    date: new Date("2024-11-15"),
  },
];

const ProjectTables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(null); 
  const [dropdownOpen, setDropdownOpen] = useState({
    status: false,
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = (column) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  const handleFilterChange = (column, value) => {
    if (column === "status") setStatusFilter(value);
  };

  const handleDateChange = (date) => {
    setDateFilter(date);
  };

  const filteredData = tableData.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
      statusFilter === "All" || row.status === statusFilter;

    const matchesDate =
      !dateFilter || row.date.toDateString() === dateFilter.toDateString();

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="mb-8">
      <Card className="shadow-md">
        <CardBody>
          <div className="flex justify-between mb-4">
            <div>
              <CardTitle tag="h5" className="text-xl font-bold text-black">Bookings List</CardTitle>
              <CardSubtitle className="text-sm text-gray-500">Overview of the bookings</CardSubtitle>
            </div>
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-1/3 p-2 rounded-lg border border-gray-300 bg-white text-black"
            />
          </div>

          <Table className="mt-3 align-middle border-separate w-full" responsive>
            <thead>
              <tr>
                <th className="text-left text-gray-700 p-3">Client Name</th>
                <th className="text-left text-gray-700 p-3">Service</th>
                <th className="text-left text-gray-700 p-3">Status</th>
                <th className="text-left text-gray-700 p-3">Time</th>
                <th className="text-left text-gray-700 p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((tdata, index) => (
                <tr key={index}>
                  <td className="p-3 flex items-center space-x-3">
                    <img src={tdata.avatar} className="rounded-full w-12 h-12" alt="avatar" />
                    <div>
                      <h6 className="font-semibold text-black">{tdata.name}</h6>
                      <span className="text-gray-500">{tdata.email}</span>
                    </div>
                  </td>
                  <td className="p-3 text-black">{tdata.project}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${tdata.status === "pending" ? 'bg-yellow-500' : tdata.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                  </td>
                  <td className="p-3 text-black">{tdata.weeks}</td>
                  <td className="p-3 text-black">{tdata.date.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
