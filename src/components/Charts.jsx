// import React, { useEffect, useRef, useState } from "react";
// import Chart from "chart.js/auto";
// import { convertTransactionsToUSD } from "../reusebale/AllPrice";
// import { fetchCurrency } from "../reusebale/fetchCurrency";

// const Charts = ({ transactions }) => {
//   const [rates, setRates] = useState({});

//

//   useEffect(() => {
//     const labels = transactions.map((item) => item.category);
//     const totalPrices = transactions.map((item) => item.totalInUSD);
//     // console.log(lables);
//     console.log(totalPrices);
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const myChartRef = chartRef.current.getContext("2d");

//     chartInstance.current = new Chart(myChartRef, {
//       type: "pie",
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             data: totalPrices,
//             backgroundColor: [
//               "rgb(32,160,69)",
//               "rgb(255, 205, 86)",
//               "rgb(255, 99, 132)",
//             ],
//           },
//         ],
//       },
//     });
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [transactions]);
//   return (
//     <div>
//       <h2>Transaction Chart</h2>
//       <canvas ref={chartRef} style={{ width: "20px", height: "50px" }} />{" "}
//     </div>
//   );
// };

// export default Charts;
import { Container, Row, Col } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useRef } from "react";

// Register the required components for a pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ transactions }) => {
  const data = {
    labels: [],
    datasets: [
      {
        label: "My Dataset",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    data.labels = [
      transactions[0].category,
      transactions[1].category,
      transactions[2].category,
    ];
    data.datasets[0].data = [
      transactions[0].totalInUSD,
      transactions[1].totalInUSD,
      transactions[2].totalInUSD,
    ];
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={12}>
        <div style={{ height: "400px" }}>
          <Pie data={data} options={options} className="mx-auto mt-4" />
        </div>
      </Col>
    </Row>
  );
};

export default Charts;
