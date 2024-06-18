import { Grid, Group, Loader, Stack, Text } from '@mantine/core'

export const WeatherCard = ({ Icon, label, value, color, isLoading }) => {
  return (
    <Grid.Col span={6}>
      <Group
        gap={15}
        style={{
          padding: '30px 40px',
          borderRadius: 10,
          background: 'white',
          //'radial-gradient(105.1% 50% at 52.4% 100%, rgb(200 204 238 / 20%) 0%, rgb(255, 255, 255) 100%)',
          border: '0.5px solid #e1e1e1',
        }}
      >
        <Icon strokeWidth={1.2} height={40} width={40} style={{ color }} />

        <Stack gap={0}>
          <Text>{label}</Text>

          {isLoading ? (
            <Loader size={'sm'} m={5} />
          ) : (
            <Text style={{ fontSize: 30, lineHeight: 1 }}>{value}</Text>
          )}
        </Stack>
      </Group>
    </Grid.Col>
  )
}
