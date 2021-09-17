import { Bar, Line } from 'react-chartjs-2'
import { Theme, useTheme } from '@mui/material/styles'

const DataChart = ({ data, type, valueType }: {
  data: any
  type: 'bar' | 'line'
  valueType: string
}): JSX.Element => {

  const theme: Theme = useTheme()

  return <div>
    {type === 'bar' ?
      <Bar
        data={{
          labels: data.map((item: any) => item.category_name || item.week || item.month),
          datasets:
            valueType === 'total_margin' ?
              [{ label: valueType, data: data.map((item: any) => item.total_margin), backgroundColor: theme.palette.primary.light }] :
              [{ label: valueType, data: data.map((item: any) => item.total_revenue), backgroundColor: theme.palette.primary.light }]
        }}
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }}
      /> :
      <Line
        data={{
          labels: data.map((item: any) => item.category_name || item.week || item.month),
          datasets:
            valueType === 'total_margin' ?
              [{ label: valueType, data: data.map((item: any) => item.total_margin), borderColor: theme.palette.primary.light }] :
              [{ label: valueType, data: data.map((item: any) => item.total_revenue), borderColor: theme.palette.primary.light }]
        }}
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }}
      />}
  </div>
}
export default DataChart
