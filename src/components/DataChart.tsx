import { Bar, Line } from 'react-chartjs-2'
import { useTheme } from '@mui/material/styles'

const DataChart = ({ data, type, valueType }: {
  data: any
  type: 'bar' | 'line'
  valueType: string
}): JSX.Element => {

  const theme = useTheme()

  return <div>
    {type === 'bar' ?
      <Bar
        data={{
          labels: data.map((cat: any) => cat.category_name || cat.week || cat.month),
          datasets:
            valueType === 'total_margin' ?
              [{ label: valueType, data: data.map((cat: any) => cat.total_margin), backgroundColor: theme.palette.primary.light }] :
              [{ label: valueType, data: data.map((cat: any) => cat.total_revenue), backgroundColor: theme.palette.primary.light }]
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
          labels: data.map((cat: any) => cat.category_name || cat.week || cat.month),
          datasets:
            valueType === 'total_margin' ?
              [{ label: valueType, data: data.map((cat: any) => cat.total_margin), borderColor: theme.palette.primary.light }] :
              [{ label: valueType, data: data.map((cat: any) => cat.total_revenue), borderColor: theme.palette.primary.light }]
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
