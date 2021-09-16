import { Bar, Line } from 'react-chartjs-2'
import { CategoryType } from '../interfaces'

const DataChart = ({ data, type, valueType }: {
  data: CategoryType[]
  type: 'bar' | 'line'
  valueType: string
}) =>
  <div>
    {type === 'bar' ?
      <Bar
        data={{
          labels: data.map((cat: any) => cat.category_name),
          datasets:
            valueType === 'total_margin' ?
              [{ label: valueType, data: data.map((cat: CategoryType) => cat.total_margin) }] :
              [{ label: valueType, data: data.map((cat: CategoryType) => cat.total_revenue) }]
        }}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "bottom"
            }
          }
        }}
      /> :
      <Line
        data={{
          labels: data.map((cat: any) => cat.category_name),
          datasets:
            valueType === 'total_margin' ?
              [{ label: valueType, data: data.map((cat: CategoryType) => cat.total_margin) }] :
              [{ label: valueType, data: data.map((cat: CategoryType) => cat.total_revenue) }]
        }}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "bottom"
            }
          }
        }}
      />}
  </div>


export default DataChart
