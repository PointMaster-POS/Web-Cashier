import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LeftContent from './LeftContent';
import { HomeContext } from '../../../../Context/HomeContext';

jest.mock('axios'); // Mock axios to prevent actual API calls

const mockHandleAddItem = jest.fn();
const mockContextValue = {
  handleAddItem: mockHandleAddItem
};

describe('LeftContent Component', () => {
  const token = 'fakeAccessToken';
  
  beforeEach(() => {
    localStorage.setItem('accessToken', JSON.stringify(token));
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders without crashing and displays loading message', () => {
    render(
      <HomeContext.Provider value={mockContextValue}>
        <LeftContent />
      </HomeContext.Provider>
    );
    
    expect(screen.getByText(/No categories available/i)).toBeInTheDocument();
  });

  test('fetches and displays categories', async () => {
    const mockCategories = [
      { category_id: 1, category_name: 'Fruits' },
      { category_id: 2, category_name: 'Vegetables' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockCategories });

    render(
      <HomeContext.Provider value={mockContextValue}>
        <LeftContent />
      </HomeContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Fruits/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Vegetables/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays products when a category is clicked', async () => {
    const mockCategories = [{ category_id: 1, category_name: 'Fruits' }];
    const mockProducts = [
      { item_name: 'Apple', price: 1.5, image_url: 'apple.png' },
      { item_name: 'Banana', price: 1.2, image_url: 'banana.png' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockCategories });
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(
      <HomeContext.Provider value={mockContextValue}>
        <LeftContent />
      </HomeContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Fruits/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Fruits/i));

    await waitFor(() => {
      expect(screen.getByText(/Apple/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Banana/i)).toBeInTheDocument();
    });
  });

  test('calls handleAddItem when a food item is clicked', async () => {
    const mockCategories = [{ category_id: 1, category_name: 'Fruits' }];
    const mockProducts = [
      { item_name: 'Apple', price: 1.5, image_url: 'apple.png' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockCategories });
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(
      <HomeContext.Provider value={mockContextValue}>
        <LeftContent />
      </HomeContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Fruits/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Fruits/i));

    await waitFor(() => {
      expect(screen.getByText(/Apple/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Apple/i));

    expect(mockHandleAddItem).toHaveBeenCalledWith(mockProducts[0]);
  });
});
