import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductCard from './ProductCard'; // Adjust path if necessary
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

// Sample product data
const product = {
  vehicleNo: 'ABC123',
  model: 'Tesla Model S',
  branchName: 'Downtown',
  photoUrl: 'https://example.com/car.jpg',
};

beforeAll(() => {
  // Suppress all console logs and warnings
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  // Restore console functions
  console.log.mockRestore();
  console.warn.mockRestore();
  console.error.mockRestore();
});

test('renders ProductCard with product data', async () => {
  render(
    <Router>
      <ProductCard product={product} />
    </Router>
  );

  // Ensure image is not hidden initially
  const img = screen.getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'https://example.com/car.jpg');

  // Check if the product model and branch name are rendered
  expect(screen.getByText('Tesla Model S')).toBeInTheDocument();
  expect(screen.getByText('Downtown')).toBeInTheDocument();

  // Check if the Rent button is present
  expect(screen.getByRole('link', { name: /Rent/i })).toBeInTheDocument();

  // Wait for any state updates or async operations to complete
  await waitFor(() => {
    expect(screen.getByRole('link', { name: /Rent/i })).toBeInTheDocument();
  });
});
