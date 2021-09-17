import React from 'react';
import { render, screen } from '@testing-library/react';

import { Customer } from './api/api'
import { CustomerType } from './interfaces'

import MenuBar from './components/MenuBar'
import DataCard from './components/DataCard'

test('fetches customers', async () => {
  const data:CustomerType[] = await Customer.getCustomers()
  expect(data[0].customer_name).toBe("Pablo Doe")
  expect(data[0].total_margin).toBe(8329.72)
});

test('renders menubar', () => {
  render(<MenuBar />)
  const title = screen.getByText('IMC Data')
  expect(title).toBeInTheDocument();
});

test('renders menubar', () => {
  render(<DataCard title='test' content={<div>test text</div>} />)
  const title  = screen.getByText('test')
  const text = screen.getByText('test text')
  expect(title).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
