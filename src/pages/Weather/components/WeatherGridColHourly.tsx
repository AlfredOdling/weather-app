import { Grid, Group } from '@mantine/core'
import { LineChart } from '@mui/x-charts/LineChart'

export const WeatherGridColHourly = ({ label, color, data }) => (
  <Grid.Col span={6}>
    <Group
      style={{
        padding: 10,
        borderRadius: 10,
        background: 'white',
        // 'radial-gradient(105.1% 50% at 52.4% 100%, rgb(200 204 238 / 20%) 0%, rgb(255, 255, 255) 100%)',
        border: '0.5px solid #e1e1e1',
      }}
    >
      <LineChart
        xAxis={[
          {
            id: 'days',
            scaleType: 'point',
            data: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24,
            ],
          },
        ]}
        series={[
          {
            label,
            color,
            data,
          },
        ]}
        width={500}
        height={250}
      />
    </Group>
  </Grid.Col>
)
