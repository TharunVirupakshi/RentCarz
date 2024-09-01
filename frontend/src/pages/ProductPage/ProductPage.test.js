import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductPage from './ProductPage';
import '@testing-library/jest-dom';

// Mocking APIService module
jest.mock('../../middleware/APIService', () => ({
  getCar: jest.fn().mockResolvedValue([{ model: 'Test Car', carType: 'SUV', branchName: 'Downtown', address: '123 Main St', photoUrl: '' }]),
  checkAvailability: jest.fn()
}));

// Mocking useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ productID: '123' }),
}));


describe('Loading Spinner Test', () => {
    test('renders loading spinner initially', async () => {
  // Mock the API calls to simulate the loading state
  jest.mock('../../middleware/APIService', () => ({
    getCar: jest.fn().mockResolvedValue([]),
    checkAvailability: jest.fn().mockResolvedValue({ isAvailable: false })
  }));

  // Render the component
  render(<ProductPage />, { wrapper: MemoryRouter });

  // Check if the loading spinner is rendered
  expect(screen.getByRole('status')).toBeInTheDocument(); // Adjust this if your spinner does not have the role 'status'
});
})



describe('ProductPage Component Rent Button', () => {

  test('shows Rent button as enabled when the car is available', async () => {
    // Mock the availability status as available
    require('../../middleware/APIService').checkAvailability.mockResolvedValue({ isAvailable: true, etrDate: null });

    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>
    );

    // Assert that the loading spinner is in the document
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the component to finish loading
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    // Assert that the Rent button is enabled and has the correct text
    const rentButton = screen.getByRole('button', { name: /rent/i });
    expect(rentButton).toBeInTheDocument();
    expect(rentButton).toBeEnabled();
  });

  test('shows Rent button as disabled when the car is unavailable', async () => {
    // Mock the availability status as unavailable
    require('../../middleware/APIService').checkAvailability.mockResolvedValue({ isAvailable: false, etrDate: '2024-09-01T00:00:00Z' });

    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>
    );

    // Assert that the loading spinner is in the document
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the component to finish loading
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    // Assert that the Rent button is disabled and has the correct text
    const rentButton = screen.getByRole('button', { name: /rent/i });
    expect(rentButton).toBeInTheDocument();
    expect(rentButton).toBeDisabled();
  });

});
