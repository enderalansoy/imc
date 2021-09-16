import React from 'react';
import { useEffect, useState } from 'react';
import { ProductType } from './interfaces'
import { Product } from './api/api'

function App() {
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
    fetchData();
  }, [])

  return (
    <div className="App">
      <div>
        {isError ? (
          <div>
            Oop!!! Error
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id}> {product.name}</div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
