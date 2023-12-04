import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Data Chart',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 4, // Adjust this value to make the border thicker
        barThickness: 100,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(data),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
        ticks: {
          font: {
            weight: '900', // Make x-axis numbers bold
          },

        },
        y: {
          beginAtZero: false, // Set this to false to start from -2
          min: -1, // Set the minimum value for the y-axis1,
          ticks: {
            font: {
              weight: '900', // Make x-axis numbers bold
            },
          },
        },
      }
    }
  }
  return <Bar data={chartData} options={options} />;
};

export default ChartComponent;
