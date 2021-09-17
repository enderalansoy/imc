import { Bar, Line } from 'react-chartjs-2'

const DataChart = ({ data, type, valueType }: {
  data: any
  type: 'bar' | 'line'
  valueType: string
}) =>
  <div>
    {type === 'bar' ?
      <Bar
        data={{
          labels: data.map((cat: any) => cat.category_name || cat.week || cat.month),
          datasets:
            valueType === 'total_margin' ?
              [{ label: valueType, data: data.map((cat: any) => cat.total_margin) }] :
              [{ label: valueType, data: data.map((cat: any) => cat.total_revenue) }]
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
              [{ label: valueType, data: data.map((cat: any) => cat.total_margin) }] :
              [{ label: valueType, data: data.map((cat: any) => cat.total_revenue) }]
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

export default DataChart
