import { Grid, Group } from '@mantine/core'
import { LineChart } from '@mui/x-charts/LineChart'

export const WeatherGridColWeekly = ({ label, color, data }) => (
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
