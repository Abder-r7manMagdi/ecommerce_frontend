import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const initialData = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00'),
];

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const lastTime = prevData[prevData.length - 2].time;
        const newTime = `${parseInt(lastTime.split(':')[0]) + 3}:00`;

        if (newTime === '27:00') return prevData; // Stop updating after 24:00

        const newAmount = Math.floor(Math.random() * 3000);
        const newData = prevData.map((d) =>
          d.time === newTime ? createData(newTime, newAmount) : d
        );

        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <Title>Today</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              // @ts-ignore
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Sales ($)',
              // @ts-ignore
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              // @ts-ignore
              tickLabelStyle: theme.typography.body2,
              max: 3000,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
