import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const Bargraph = ({ iaqiData }) => {
  // Define dummy data with all values set to 0
  const dummyData = [
    { country: 'dew', value: 0 },
    { country: 'h', value: 0 },
    { country: 'p', value: 0 },
    { country: 'pm25', value: 0 },
    { country: 't', value: 0 },
    { country: 'w', value: 0 },
  ];

  // Render the bar graph with iaqiData if available, otherwise use dummy data
  return (
    <div>
      {iaqiData ? (
        <ResponsiveBar
          data={Object.entries(iaqiData).map(([key, value]) => ({
            country: key,
            value: value.v,
          }))}
          keys={['value']}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Country',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Value',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
          }}
        />
      ) : (
        <ResponsiveBar
          data={dummyData}
          keys={['value']}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Country',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Value',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
          }}
        />
      )}
    </div>
  );
};

export default Bargraph;
