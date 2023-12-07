import { Bar } from 'react-chartjs-2';
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

export default function StatisticsBarChart() {
  const [titlesAndDurations, setTitlesAndDurations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://traineeapp.azurewebsites.net/api/trainings'
      );

      const data = await response.json();
      const content = data.content;
      //Add id to the object (just in case here as well)
      const modifiedList = content.map((custObj, index) => ({
        ...custObj,
        id: index,
      }));
      //Filter unnecessary data
      const titleDurationObjects = modifiedList.map(eventItem => ({
        id: eventItem.id,
        duration: eventItem.duration,
        title: `${eventItem.activity}`,
      }));
      //Groupping with lodash
      const groupedByTitle = _(titleDurationObjects)
        .groupBy('title')
        .map((group, title) => ({
          title,
          totalDuration: _.sumBy(group, 'duration'),
        }))
        .value();
      //Groupped data adapted for the chart
      const chartData = {
        labels: groupedByTitle.map(actObj => actObj.title),
        datasets: [
          {
            label: 'Activities chart / Total duration (minuites)',
            backgroundColor: '#4e9cea',
            borderColor: '#fff',
            borderWidth: 1,
            data: groupedByTitle.map(actObj => actObj.totalDuration),
          },
        ],
      };

      setTitlesAndDurations(chartData);
    };

    fetchData();
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  // Conditional rendering (helps avoid crahses when titlesAndDurations is still undefined )
  return (
    <Box>
      {/* !titlesAndDurations expression wouldn't work here */}
      {titlesAndDurations.length === 0 ? (
        <Box>
          <p>No data available</p>
        </Box>
      ) : (
        <Box height="50vh">
          <Bar data={titlesAndDurations} options={options} />
        </Box>
      )}
    </Box>
  );
}
