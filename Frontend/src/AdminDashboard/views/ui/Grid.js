import React, { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import SalesChart from "../../components/dashboard/SalesChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import ScatterChart from "../../components/ScatterChart";
import TopCards from "../../components/dashboard/TopCards";

const Grid = () => {
  const [selectedChart, setSelectedChart] = useState("area");

  const handleChartSelect = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <div>
      <div className="flex gap-3 mb-3">
        <Button className="btn" color="secondary" onClick={() => handleChartSelect("area")}>
          Area Plot
        </Button>
        <Button className="btn" color="secondary" onClick={() => handleChartSelect("bar")}>
          Bar Plot
        </Button>
        <Button className="btn" color="secondary" onClick={() => handleChartSelect("pie")}>
          Pie Plot
        </Button>
        <Button className="btn" color="secondary" onClick={() => handleChartSelect("scatter")}>
          Scatter Plot
        </Button>
      </div>

      {selectedChart === "area" && <SalesChart />}
      {selectedChart === "bar" && <BarChart />}
      {selectedChart === "pie" && <PieChart />}
      {selectedChart === "scatter" && <ScatterChart />}

      <Row className="mt-6">
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-green-100 text-green-600"
            title="Profit"
            subtitle="Yearly Earning"
            earning="$21k"
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-red-100 text-red-600"
            title="Refunds"
            subtitle="Monthly Earning"
            earning="$1k"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-yellow-100 text-yellow-600"
            title="New Project"
            subtitle="Total Bookings"
            earning="456"
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
    </div>
  );
};

export default Grid;
