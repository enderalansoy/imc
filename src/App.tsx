import React, { useEffect, useState } from 'react';

import { Box, Grid, FormControl, InputLabel, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

import { Category, Customer, Invoice, Period } from './api/api'
import { CategoryType, CustomerType, InvoiceType, PeriodType } from './interfaces'
import { roundNumber } from './helpers'

import DataCard from './components/DataCard'
import DataChart from './components/DataChart'
import MenuBar from './components/MenuBar'

const App = () => {
  const [valueType, setValueType] = useState<string>('total_revenue')
  const [period, setPeriod] = useState<string>('weekly')

  const [invoices, setInvoices] = useState<InvoiceType[]>([])
  const [customers, setCustomers] = useState<CustomerType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [revenues, setRevenues] = useState<PeriodType[]>([])

  const [isError, setIsError] = useState<boolean>(false)

  const invoiceColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 100 },
    { field: 'customer_name', headerName: 'Customer Name', flex: 300 },
    { field: 'date', headerName: 'Date', flex: 150 },
    { field: 'region', headerName: 'Region', flex: 150 },
    {
      field: 'total_invoice',
      headerName: 'Total Invoice',
      flex: 150,
      // Round the number to 2 decimal places
      valueFormatter: (params: GridValueFormatterParams) => roundNumber(Number(params.value)),
      hide: valueType === 'total_revenue' ? false : true
    },
    {
      field: 'total_margin',
      headerName: 'Total Margin',
      flex: 150,
      // Round the number to 2 decimal places
      valueFormatter: (params: GridValueFormatterParams) => roundNumber(Number(params.value)),
      hide: valueType === 'total_margin' ? false : true
    },
    { field: 'region', headerName: 'Region', flex: 150 }
  ]

  const customerColumns: GridColDef[] = [
    { field: 'customer_id', headerName: 'ID', flex: 100 },
    { field: 'customer_name', headerName: 'Customer Name', flex: 300 },
    {
      field: 'total_revenue',
      headerName: 'Total Revenue',
      flex: 150,
      // Round the number to 2 decimal places
      valueFormatter: (params: GridValueFormatterParams) => roundNumber(Number(params.value)),
      hide: valueType === 'total_revenue' ? false : true
    },
    {
      field: 'total_margin',
      headerName: 'Total Margin',
      flex: 150,
      // Round the number to 2 decimal places
      valueFormatter: (params: GridValueFormatterParams) => roundNumber(Number(params.value)),
      hide: valueType === 'total_margin' ? false : true
    },
    { field: 'invoices_count', headerName: '# of Invoices', flex: 150 }
  ]

  console.log(categories)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInvoices(await Invoice.getInvoices({ params: { '_sort': 'date', '_order': 'desc' } }))
        setCustomers(await Customer.getCustomers({ params: { '_sort': valueType, '_order': 'desc' } }))
        setCategories(await Category.getCategories({ params: { '_sort': valueType, '_order': 'desc' } }))
        if (period === 'weekly') {
          setRevenues(await Period.getWeekly({ params: { '_sort': 'week', '_order': 'asc' } }))
        } else {
          setRevenues(await Period.getMonthly({ params: { '_sort': 'month', '_order': 'asc' } }))
        }
      } catch (e) {
        console.error(e)
        setIsError(true)
      }
    }
    fetchData()
  }, [valueType, period])

  return (
    <div className="App">
      <MenuBar />
      <Box sx={{ margin: 4 }}>
        {isError ? (
          <div>
            There is an error.
          </div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth>
                <InputLabel>Value Type</InputLabel>
                <Select
                  value={valueType}
                  label="Value Type"
                  onChange={(event: SelectChangeEvent) => setValueType(event.target.value as string)}
                >
                  <MenuItem value={'total_revenue'}>Revenue</MenuItem>
                  <MenuItem value={'total_margin'}>Margin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>
                <Select
                  value={period}
                  label="Period"
                  onChange={(event: SelectChangeEvent) => setPeriod(event.target.value as string)}
                >
                  <MenuItem value={'weekly'}>Weekly</MenuItem>
                  <MenuItem value={'monthly'}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <DataCard title={'Latest Invoices'} content={
                <div style={{ height: 500, width: '100%' }}>
                  <DataGrid
                    rows={invoices}
                    columns={invoiceColumns}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                  />
                </div>
              }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataCard title={'Best Customers'} content={
                <div style={{ height: 500, width: '100%' }}>
                  <DataGrid
                    rows={customers}
                    columns={customerColumns}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    getRowId={(row) => row.customer_id}
                  />
                </div>
              }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataCard
                title={'Categories'}
                content={<DataChart data={categories} valueType={valueType} type={'bar'} />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataCard
                title={'Revenue Periods'}
                content={<DataChart data={revenues} valueType={valueType} type={'line'} />}
              />
            </Grid>
          </Grid>

        )}
      </Box>
    </div>
  );
}

export default App
