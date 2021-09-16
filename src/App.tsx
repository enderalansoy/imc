import React from 'react';
import { useEffect, useState } from 'react';
import { ProductType } from './interfaces'
import { Product } from './api/api'
import Menu from './components/Menu'
import DataCard from './components/DataCard'
import { Container, Grid, Box } from '@mui/material'

const App = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProducts(await Product.getProducts())
      } catch (e) {
        console.error(e)
        setIsError(true)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App" style={{ backgroundColor: '#121212' }} >
      <Menu />
      <Box sx={{ margin: 4 }}>
        <Grid container spacing={2}>
            {isError ? (
              <div>
                There is an error.
              </div>
            ) : (
              products.map((product) => (
                <Grid item xs={12} md={6}>
                  <DataCard key={product.id} title={product.name} content={<div>Content will be passed here...</div>} />
                </Grid>
              ))
            )}
        </Grid>
      </Box>
    </div>
  );
}

export default App
