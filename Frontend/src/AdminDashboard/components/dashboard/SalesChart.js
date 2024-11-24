import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const chartOptions = {
    series: [
      { name: "idk", data: [0, 31, 40, 28, 51, 42, 109, 100] },
      { name: "Oneplue 9", data: [0, 11, 32, 45, 32, 34, 52, 41] },
    ],
    options: {
      chart: { type: "area" },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 1 },
      grid: { strokeDashArray: 3 },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      },
    },
  };

  return (
    <Card className="shadow-md mt-5">
      <CardBody className="px-6 py-6 flex flex-col w-full h-[500px]">
        <CardTitle tag="h5" className="text-xl font-semibold text-black">
          Sales Summary
        </CardTitle>
        <CardSubtitle className="text-sm text-gray-500">
          Yearly Sales Report
        </CardSubtitle>
        <div className="flex-grow">
          <Chart
            type="area"
            width="100%"
            height="100%"
            options={chartOptions.options}
            series={chartOptions.series}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
