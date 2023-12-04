import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          // Add more colors if you have more categories
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          // Add more hover colors if you have more categories
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChartComponent;
