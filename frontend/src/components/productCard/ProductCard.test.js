import React from 'react';
import { render, screen } from '@testing-library/react';
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

test('renders ProductCard with product data', () => {
  render(
    <Router>
      <ProductCard product={product} />
    </Router>
  );

  // Ensure the image is rendered correctly
  const img = screen.getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', product.photoUrl); // Using product.photoUrl for dynamic reference

  // Check if the product model and branch name are rendered
  expect(screen.getByText(product.model)).toBeInTheDocument();
  expect(screen.getByText(product.branchName)).toBeInTheDocument();

  // Check if the Rent button is present
  expect(screen.getByRole('link', { name: /rent/i })).toBeInTheDocument(); // Assumes Rent button is a link
});
