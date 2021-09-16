import React from 'react';
import { useEffect, useState } from 'react';
import { CustomerType, InvoiceType } from './interfaces'
import { Customer, Invoice } from './api/api'
import Menu from './components/Menu'
import DataCard from './components/DataCard'
import { Box, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

const App = () => {
  const [valueType, setValueType] = useState<string>('total_revenue')
  const [invoices, setInvoices] = useState<InvoiceType[]>([])
  const [customers, setCustomers] = useState<CustomerType[]>([])

  const [isError, setIsError] = useState<boolean>(false)

  const invoiceColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 100 },
    { field: 'customer_name', headerName: 'Customer Name', flex: 300 },
    { field: 'date', headerName: 'Date', flex: 150 }
  ]

  const customerColumns: GridColDef[] = [
    { field: 'customer_id', headerName: 'ID', flex: 100 },
    { field: 'customer_name', headerName: 'Customer Name', flex: 300 },
    {
      field: 'total_revenue',
      headerName: 'Total Revenue',
      flex: 150,
      // Round the number to 2 decimal places
      valueFormatter: (params: GridValueFormatterParams) => Math.round((Number(params.value) + Number.EPSILON) * 100) / 100,
      hide: valueType == 'total_revenue' ? false : true
    },
    {
      field: 'total_margin',
      headerName: 'Total Margin',
      flex: 150,
      // Round the number to 2 decimal places
      valueFormatter: (params: GridValueFormatterParams) => Math.round((Number(params.value) + Number.EPSILON) * 100) / 100,
      hide: valueType == 'total_margin' ? false : true
    },
    { field: 'invoices_count', headerName: '# of Invoices', flex: 150 }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInvoices(await Invoice.getInvoices({ params: { '_sort': 'date', '_order': 'desc' } }))
        setCustomers(await Customer.getCustomers({ params: { '_sort': valueType, '_order': 'desc' } }))
      } catch (e) {
        console.error(e)
        setIsError(true)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <Menu />
      <Box sx={{ margin: 4 }}>
        {isError ? (
          <div>
            There is an error.
          </div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DataCard title={'Latest Invoices'} content={
                <div style={{ height: 600, width: '100%' }}>
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
                <div style={{ height: 600, width: '100%' }}>
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
          </Grid>

        )}
      </Box>
    </div>
  );
}

export default App
