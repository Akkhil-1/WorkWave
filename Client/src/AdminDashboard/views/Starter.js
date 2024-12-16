import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTableDash";
import TopCards from "../components/dashboard/TopCards";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";

const Starter = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  useEffect(() => {
    const fetchTotalBookings = async () => {
      try {
        const response = await fetch(
          `https://workwave-aage.onrender.com/business/getBookings`,
          {
            method: "GET", // Optional if GET is the default method
            credentials: "include", // Include credentials such as cookies
            headers: {
              "Content-Type": "application/json", // Optional, specify if needed
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch total bookings");
        }
        const data = await response.json();
        console.log("ehbfh", data.bookings);
        setTotalBookings(data.bookings.length); // Assuming 'booking' is the array in the response
      } catch (error) {
        console.error("Error fetching total bookings:", error);
      }
    };

    fetchTotalBookings();
  }, []);
  return (
    <div>
      {/* Top Cards */}
      <Row className="gap-6 flex flex-col sm:flex-row justify-center">
        {/* <Col sm="6" lg="3">
          <TopCards
            bg="bg-green-100 text-green-600"
            title="Profit"
            subtitle="Yearly Earning"
            earning="$21k"
            icon="bi bi-wallet"
          />
        </Col> */}
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-red-100 text-red-600"
            title="Refunds"
            subtitle="Monthly Earning"
            earning="₹1k"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-yellow-100 text-yellow-600"
            title="New Project"
            subtitle="Total Bookings"
            earning={`${totalBookings}`}
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-blue-100 text-blue-600"
            title="Sales"
            subtitle="Pending Bookings"
            earning="210"
            icon="bi bi-bag"
          />
        </Col>
      </Row>

      {/* Sales & Feed */}
      <Row className="gap-6 flex flex-col sm:flex-row justify-center">
        <Col sm="6" lg="6" xl="7" className="w-[650px]">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5">
          <Feeds />
        </Col>
      </Row>

      {/* Project Table */}
      <Row className="mt-6">
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
